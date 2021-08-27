import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
 /*  Switch,
  Route,
  Link, */
  Redirect
} from "react-router-dom";

import Sidebar from './components/sidebar/Sidebar';
import Header from './components/mainheader/MainHeader';
import HeaderMobile from './components/mainheader/MainHeaderMobile';
import Home from './components/home/Home';
import HomeMobile from './components/home/HomeMobile';
import About from './components/about/About';
import AboutMobile from './components/about/AboutMobile';
import Collections from './components/collections/Collections';
import CollectionsMobile from './components/collections/CollectionsMobile';
import Contact from './components/contact/Contact';
import ContactMobile from './components/contact/ContactMobile';
import CollectionsPanel from './components/collectionspanel/CollectionsPanel';

/* import { useAuth0 } from "@auth0/auth0-react"; */

import { useMediaQuery } from 'react-responsive'

import {
 /*  motion, */
  useViewportScroll,
 /*  useSpring,
  useTransform */
} from "framer-motion";

import { useAppSelector, useAppDispatch } from './redux/hooks'
import { navigationSlice } from "../src/redux/slices/navigationSlice";
import { ThemeProvider } from 'styled-components';

function App() {

 /*  const { logout, user } = useAuth0() */

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

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" })

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <div className="App">
      <Router>
        <Redirect to={{ pathname: `/${currentPageURL}`, }} />
        <ThemeProvider theme={theme}>
          
            {isDesktopOrLaptop && 
            <>
            <Header></Header>
            <Home></Home>
            <Sidebar></Sidebar>
            <About></About>
            <Collections></Collections>
            <Contact></Contact>
            <CollectionsPanel></CollectionsPanel>
            </>
            }
            {isTabletOrMobile &&
            <>
            <HeaderMobile></HeaderMobile>
            <HomeMobile></HomeMobile>
            <Sidebar></Sidebar>
            <AboutMobile></AboutMobile>
            <CollectionsMobile></CollectionsMobile>
            <ContactMobile></ContactMobile>
            <CollectionsPanel></CollectionsPanel>
            </>
            }
         

        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
