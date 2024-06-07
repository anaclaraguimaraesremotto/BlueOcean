import React, { createContext, useContext, useState } from 'react';

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
}

const GlobalStateContext = createContext<GlobalStateContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
  cadastro: async () => {},
  home: async () => {},
  menu: async () => {},
});

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleResponse = async (response: Response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro desconhecido');
    }
    return data;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://192.168.0.1:3000/api/login', {
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
    }
  };

  const cadastro = async (nome_usuario: string, user: string, email: string, senha_hash: string, confirma_senha_hash: string) => {
    try {
      const response = await fetch('http://192.168.0.1:3000/api/cadastro', {
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
    }
  };

  const home = async (mensagem: string, user: string) => {
    try {
      const response = await fetch('http://192.168.0.1:3000/api/home', {
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
    }
  };

  const menu = async (mensagem: string, user: string) => {
    try {
      const response = await fetch('http://192.168.0.1:3000/api/menu', {
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
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <GlobalStateContext.Provider value={{ user, login, logout, cadastro, home, menu }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
