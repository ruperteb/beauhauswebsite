import { motion } from 'framer-motion';
import * as React from 'react';
import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectAboutPixelsPassed, selectHomePixelsPassed } from '../../redux/slices/navigationSlice';

import useResizeObserver from "@react-hook/resize-observer";

import Antiques from "../../assets/Antiques_about.jpg"
interface Props {

}

const AboutImage = styled(Image)`
    /* height: 150px; */
    margin-left: auto;
    margin-right: auto;
    min-height: 400px;
   /*  position: relative;
    z-index: -1; */
  `
const AboutGridRow = styled(Grid.Row)`
padding-bottom: 0px !important;
padding-top: 0px !important;
`

const AboutTextDiv = styled.div`
display: flex;
flex-direction: column;
`
const AboutHeadingTextDiv = styled(motion.h1)`
margin-left: 10%;
margin-right: 10%;
margin-top: auto !important;
margin-bottom: 2rem;
font-family: "cinzel";
font-size: 36px;
/* color: #ccaa66;
text-shadow: 1px 1px 1px black; */
color: #084b6d;
text-shadow: 1px 1px 1px #eadede;
`

const AboutSubHeadingTextDiv = styled(motion.div)`
margin-left: 20%;
margin-right: 20%;
margin-top: 0px;
margin-bottom: auto;
font-family: sans-serif;
font-size: 16px;
/* color: white; */
color: #084b6d;
`

const BlankDiv = styled(motion.div)`
/* background-color: #334a60; */
/* background-color: #b8c8bd; */
background-color: #bfd5cb;
width: 100%;
height: 100%;
position: absolute;
    top: 0;
    /* right: 0; */
    float: right;
`

export const About: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const showCollectionsPanel = useAppSelector((state) => state.navigation.showCollectionsPanel)
    const aboutPixelsPassed = useAppSelector(selectAboutPixelsPassed)

    const dispatch = useAppDispatch()

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
        collectionsVisible: { x: "-100vw" },
    }

    const blankDivVariants = {
        hidden: { width: "100%" },
        visible: { width: "0%" },
    }

    const textVariants = {
        hidden: { opacity: 0, y: "200px", /* x: -50 */ },
        visible: { opacity: 1, y: "0px", /* x: 0 */ },
    }

    const visibility = () => {
        if (aboutPixelsPassed >= 300 /* || homeBottomPassed === true */) {
            return true
        } else return false
    }

    React.useEffect(()=> {
        if(aboutPixelsPassed >=400)
        dispatch(navigationSlice.actions.setCurrentPageURL("#about"))
    },[aboutPixelsPassed])

    const aboutRef = React.useRef<HTMLDivElement>(null)

      useResizeObserver(aboutRef, (entry) => {
            dispatch(navigationSlice.actions.setAboutHeight(entry.contentRect.height))
    });

    const checkAnimationVariant = () => {
        if (showCollectionsPanel === true) {
            return "collectionsVisible"
        } else if (showSidebar === true) {
            return "visible"
        } else return "hidden"

    }

    return (
            <motion.div
                ref={aboutRef}
                animate={checkAnimationVariant()}
                variants={panelVariants}
                transition={{ duration: 0.5 }}
            >
                <Grid stackable style={{ /* backgroundColor: "#334a60" */ /* backgroundColor: "#b8c8bd" */marginLeft: 0, backgroundColor: "#bfd5cb", marginTop: 0, marginBottom: 0 }}>
                    <AboutGridRow >
                        <Grid.Column style={{ display: "flex" }} width={6}>
                            <AboutTextDiv>
                                <AboutHeadingTextDiv initial={false} animate={visibility() ? "visible" : "hidden"} variants={textVariants} transition={{ duration: 1, delay: 0.1 }}>
                                    About Us
                                </AboutHeadingTextDiv>
                                <AboutSubHeadingTextDiv initial={false} animate={visibility() ? "visible" : "hidden"} variants={textVariants} transition={{ duration: 1, delay: 0.2 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </AboutSubHeadingTextDiv>

                            </AboutTextDiv>

                        </Grid.Column>
                        <Grid.Column width={10} style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <AboutImage src={Antiques}></AboutImage>
                            <BlankDiv
                                animate={visibility() ? "visible" : "hidden"}
                                variants={blankDivVariants}
                                transition={{ duration: 0.9 }}
                            >

                            </BlankDiv>
                        </Grid.Column>

                    </AboutGridRow>
                </Grid>
            </motion.div>
    );
};

export default About