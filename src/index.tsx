import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://beauhaus.netlify.app/.netlify/functions/server",
  /* credentials: 'include', */
  fetchOptions: {
    mode: 'no-cors',
  },
  
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
 
  
  
});

ReactDOM.render(
  <React.StrictMode>
   <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
