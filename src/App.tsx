/* import React from 'react'; */
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

import { useAppSelector, useAppDispatch } from './redux/hooks'
import { navigationSlice } from "../src/redux/slices/navigationSlice";

function App() {

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError
  } = useQuery<Query>(GET_ITEMS);

  console.log(itemData)

  const { logout } = useAuth0()

  const currentPage = useAppSelector((state) => state.navigation.currentPage)
  const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
  const scrollY = useAppSelector((state) => state.navigation.scrollY)

  console.log(currentPage)
  console.log(currentPageURL)
  console.log(scrollY)

  return (
    <div className="App">
      Logged In?
      <Button onClick={()=>logout({ returnTo: window.location.origin })}></Button>
    </div>
  );
}

export default App;
