import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink
} from "@apollo/client";

import AppRouter from './AppRouter';
import ApolloWrapper from "./ApolloWrapper";
import { Auth0Provider } from "@auth0/auth0-react";

const httpLink = new HttpLink({
  uri: "https://beauhaus.netlify.app/.netlify/functions/server",
  /* uri: "http://localhost:8888/.netlify/functions/server",  */
  /* credentials: 'include', */
  /* fetchOptions: {
    mode: 'no-cors',
  }, */

})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),



});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      audience={process.env.REACT_APP_AUDIENCE}
      redirectUri={`${window.location.origin}/main`}
    >
      <ApolloWrapper>
        <AppRouter />
      </ApolloWrapper>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
