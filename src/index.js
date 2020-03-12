import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'

const GITHUB_BASE_URL = 'https://api.github.com/graphql';
console.log(process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN)

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(graphQLErrors) {

  }

  if(networkError) {

  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
