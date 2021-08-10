import React from 'react';
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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import SidebarWrapper from './components/sidebarwrapper/SidebarWrapper';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/mainheader/MainHeader';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Collections from './components/collections/Collections';
import CollectionsPanel from './components/collectionspanel/CollectionsPanel';

import { useAuth0 } from "@auth0/auth0-react";

import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform
} from "framer-motion";

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

  const dispatch = useAppDispatch()

  const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)

  const { scrollY: scrollYFramer } = useViewportScroll();
  const scrollY = useAppSelector((state) => state.navigation.scrollY)

  React.useEffect(() => {

    scrollYFramer.onChange((latestY) =>
      dispatch(navigationSlice.actions.setScrollY(latestY))
    )

    if (scrollY <= 50) {
      dispatch(navigationSlice.actions.setScrollTop(true))
    } else dispatch(navigationSlice.actions.setScrollTop(false))

  }, [scrollYFramer, scrollY])

  React.useEffect(() => {

    if (window.innerHeight)

      dispatch(navigationSlice.actions.setWindowHeight(window.innerHeight))

  }, [])


  return (
    <div className="App">
      <Router>
        <Redirect to={{ pathname: `/${currentPageURL}`, }} />

        <Header></Header>
        <Home></Home>
        <Sidebar></Sidebar>
        <About></About>
        <Collections></Collections>
        <Contact></Contact>
        <CollectionsPanel></CollectionsPanel>
      </Router>
    </div>
  );
}

export default App;
