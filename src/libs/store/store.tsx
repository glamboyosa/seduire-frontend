import React, { createContext, useState } from 'react';
type AppProps = {
  children?: any;
};
interface ContextProps {
  token: string | null;
  setTokenHandler: (token: string | null) => void;
  stripePublishableSecret: string;
  stripeClientSecret: string;
  setStripeHandler: (publishableSecret: string, clientSecret: string) => void;
}
export const context = createContext({} as ContextProps);

const TokenContextProvider = ({ children }: AppProps) => {
  const [token, setToken] = useState<string | null>('');
  const [stripeClientSecret, setClientSecret] = useState('');
  const [stripePublishableSecret, setPublishableSecret] = useState(
    process.env.REACT_APP_stripePublishableKey!
  );
  const setTokenHandler = (token: string | null) => {
    setToken(token);
  };
  const setStripeHandler = (
    publishableSecret: string,
    clientSecret: string
  ) => {
    setClientSecret(clientSecret);
    setPublishableSecret(publishableSecret);
  };
  return (
    <context.Provider
      value={{
        token,
        setTokenHandler,
        stripeClientSecret,
        stripePublishableSecret,
        setStripeHandler
      }}
    >
      {children}
    </context.Provider>
  );
};
export default TokenContextProvider;
