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
import { ThemeProvider } from 'styled-components';


function App() {

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError
  } = useQuery<Query>(GET_ITEMS);


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


  const theme = {
    primaryColor: "#bfd5cb",
    secondaryColor: "#1e5c9738",
    tertiaryColor: "white",

    primaryTextColor: "#084b6d",
    secondaryTextColor: "black",
    tertiaryTextColor: "white",

    primaryTextFont: "'Bodoni Moda', serif",
    secondaryTextFont: "'Mulish', sans-serif",
    tertiaryTextFont: "'Montserrat', sans-serif",

    primaryButtonTextColor: "#084b6d",
    secondaryButtonTextColor: "white",
    primaryButtonBackgroundColor: "transparent",
    secondaryButtonBackgroundColor: "#084b6d",
    buttonBoxShadow: "-1px 1px 5px 1px #0000001f",
    buttonBorderWidth: "1px",
    buttonBorderColor: "#084b6d",

  };

  return (
    <div className="App">
      <Router>
        <Redirect to={{ pathname: `/${currentPageURL}`, }} />
        <ThemeProvider theme={theme}>
        <Header></Header>
        <Home></Home>
        <Sidebar></Sidebar>
        <About></About>
        <Collections></Collections>
        <Contact></Contact>
        <CollectionsPanel></CollectionsPanel>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
