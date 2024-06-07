import React, { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  email: string;
  token: string;
}

interface GlobalStateContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({
  user: null,
  login: async () => {},
});

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://192.168.0.1:3000/api/login', { // Use o endereço IP da sua máquina
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

  return (
    <GlobalStateContext.Provider value={{ user, login }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
