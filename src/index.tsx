import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://seduire-backend.herokuapp.com/api/graphql',
  headers: {
    Authorization: localStorage.getItem('Auth Token')
      ? `Bearer ${localStorage.getItem('Auth Token')}`
      : ''
  }
});
const client = new ApolloClient({
  cache,
  link,
  resolvers: {}
});
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('Auth Token')
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
