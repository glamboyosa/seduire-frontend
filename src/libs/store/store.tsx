import React, { createContext, useState } from 'react';
type AppProps = {
  children?: any;
};
interface ContextProps {
  token: string | null;
  setTokenHandler: (token: string | null) => void;
}
export const context = createContext({} as ContextProps);

const TokenContextProvider = ({ children }: AppProps) => {
  const [token, setToken] = useState<string | null>('');
  const setTokenHandler = (token: string | null) => {
    setToken(token);
  };
  return (
    <context.Provider value={{ token, setTokenHandler }}>
      {children}
    </context.Provider>
  );
};
export default TokenContextProvider;
