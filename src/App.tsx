import React, { useEffect } from 'react';
import Routes from './Router/routes';
import useContextHandler from './libs/hooks/useContext';
import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_stripePublishableKey!);
function App() {
  const { token, setTokenHandler } = useContextHandler();

  const removeToken = () => {
    setTokenHandler(null);
    localStorage.removeItem('Auth Token');
    localStorage.removeItem('expsIn');
    localStorage.removeItem('expDate');
  };
  const checkTimeLeft = (expsIn: number) =>
    setTimeout(() => removeToken(), expsIn * 1000);
  useEffect(() => {
    if (!localStorage.getItem('Auth Token')) {
      removeToken();
    } else {
      setTokenHandler(localStorage.getItem('Auth Token')!);
      const expiryDate = new Date(localStorage.getItem('expDate')!);
      const currentDate = new Date();
      if (currentDate > expiryDate) {
        checkTimeLeft(currentDate.getTime() - expiryDate.getTime() / 1000);
      } else {
        removeToken();
      }
    }
  }, []);
  const cache = new InMemoryCache();
  const link = new HttpLink({
    uri: process.env.NODE_ENV === "production" ? 'https://seduire-backend.herokuapp.com/api/graphql': "http://localhost:5000/api/graphql",
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  const client = new ApolloClient({
    cache,
    link,
    resolvers: {}
  });
  cache.writeData({
    data: {
      isLoggedIn: !!token
    }
  });
  return (
    <Elements stripe={stripePromise}>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </Elements>
  );
}

export default App;
