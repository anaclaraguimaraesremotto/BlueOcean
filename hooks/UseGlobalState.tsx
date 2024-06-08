// hooks/UseGlobalState.js
import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  token: string;
}

interface GlobalStateContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  cadastro: (nome_usuario: string, user: string, email: string, senha_hash: string, confirma_senha_hash: string) => Promise<void>;
  home: (mensagem: string, user: string) => Promise<void>;
  menu: (mensagem: string, user: string) => Promise<void>;
  messages: any[];
}

const GlobalStateContext = createContext<GlobalStateContextProps>({
  user: null,
  messages: [],
  login: async () => {},
  logout: () => {},
  cadastro: async () => {},
  home: async () => {},
  menu: async () => {},
});

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleResponse = async (response: Response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro desconhecido');
    }
    return data;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha_hash: password }),
      });

      const data = await handleResponse(response);
      setUser({ id: data.user.id, email: data.user.email, token: data.token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const cadastro = async (nome_usuario: string, user: string, email: string, senha_hash: string, confirma_senha_hash: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome_usuario, user, email, senha_hash, confirma_senha_hash }),
      });

      const data = await handleResponse(response);
      setUser({ id: data.user.id, email: data.user.email, token: data.token });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      throw error;
    }
  };

  const home = async (mensagem: string, user: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensagem, user }),
      });

      const data = await handleResponse(response);
      setMessages(prevMessages => [...prevMessages, data]);
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      throw error;
    }
  };

  const menu = async (mensagem: string, user: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensagem, user }),
      });

      const data = await handleResponse(response);
      console.log('Mensagem enviada com sucesso:', data);
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <GlobalStateContext.Provider value={{ user, messages, login, logout, cadastro, home, menu }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
