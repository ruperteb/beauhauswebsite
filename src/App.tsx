/* import React from 'react'; */
import './App.css';

import { GET_ITEMS, GET_SINGLE_ITEM } from "./gql/gql"
import { Query } from "./schematypes/schematypes"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import SidebarWrapper from './components/sidebarwrapper/SidebarWrapper';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/mainheader/MainHeader';
import Home from './components/home/Home';
import About from './components/about/About';

import { useAuth0 } from "@auth0/auth0-react";

import { useAppSelector, useAppDispatch } from './redux/hooks'
import { navigationSlice } from "../src/redux/slices/navigationSlice";

import {
  Button,
  Checkbox,
  Container,
  Grid,
  /* Header, */
  Icon,
  Image,
  Menu,
  Segment,
  
} from 'semantic-ui-react'

function App() {

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError
  } = useQuery<Query>(GET_ITEMS);

  console.log(itemData)

  const { logout, user } = useAuth0()

  const currentPage = useAppSelector((state) => state.navigation.currentPage)
  const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
  const scrollY = useAppSelector((state) => state.navigation.scrollY)

  console.log(currentPage)
  console.log(currentPageURL)
  console.log(scrollY)


  return (
    <div className="App">

      {/* <SidebarWrapper> */}
      <Header></Header>
        <Home></Home>
        <Sidebar></Sidebar>
        <About></About>
<div style={{height: "1000px"}}></div>
     {/*  </SidebarWrapper> */}



    </div>
  );
}

export default App;
