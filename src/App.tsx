import React from 'react';
import logo from './logo.svg';
import './App.css';

import { GET_ITEMS, GET_SINGLE_ITEM} from "./gql/gql"
import { Query} from "./schematypes/schematypes"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import { Button } from 'semantic-ui-react'

import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError
  } = useQuery<Query>(GET_ITEMS);

  console.log(itemData)

  const { logout } = useAuth0()

  return (
    <div className="App">
      Logged In?
      <Button onClick={()=>logout({ returnTo: window.location.origin })}></Button>
    </div>
  );
}

export default App;
