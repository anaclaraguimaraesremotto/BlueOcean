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
}

const GlobalStateContext = createContext<GlobalStateContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
  cadastro: async () => {},
  home: async () => {},
});

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://192.168.0.1:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha_hash: password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.user.id, email: data.user.email, token: data.token });
      } else {
        throw new Error(data.message);
      }
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

      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.user.id, email: data.user.email, token: data.token });
      } else {
        throw new Error(data.message);
      }
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

      const data = await response.json();
      if (response.ok) {
        console.log('Mensagem enviada com sucesso:', data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <GlobalStateContext.Provider value={{ user, login, logout, cadastro, home }}>
      {children}
    </GlobalStateContext.Provider>
  );
};