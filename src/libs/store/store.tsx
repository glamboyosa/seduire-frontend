import React, { createContext, useState } from 'react';
type AppProps = {
  children?: any;
};
interface ContextProps {
  token: string | undefined;
  setTokenHandler: (token: string | undefined) => void;
}
export const context = createContext({} as ContextProps);

const TokenContextProvider = ({ children }: AppProps) => {
  const [token, setToken] = useState<string | undefined>('');
  const setTokenHandler = (token: string | undefined) => {
    setToken(token);
  };
  return (
    <context.Provider value={{ token, setTokenHandler }}>
      {children}
    </context.Provider>
  );
};
export default TokenContextProvider;
