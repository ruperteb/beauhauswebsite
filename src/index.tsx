import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css'

import AppRouter from './AppRouter';
import ApolloWrapper from "./ApolloWrapper";
import { Auth0Provider } from "@auth0/auth0-react";

import { store } from './redux/store';
import { Provider } from 'react-redux';

import "typeface-cinzel"
import "typeface-montserrat"

import 'mapbox-gl/dist/mapbox-gl.css';

import GA4React, { useGA4React } from "ga-4-react";

const ga4react = new GA4React("G-XJDR325FGS");

(async () => {
  await ga4react.initialize();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      audience={process.env.REACT_APP_AUDIENCE}
      redirectUri={`${window.location.origin}/dashboard`}
    >
      <Provider store={store}>
        <ApolloWrapper>
          <AppRouter />
        </ApolloWrapper>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
