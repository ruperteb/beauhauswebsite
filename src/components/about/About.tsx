import { motion } from 'framer-motion';
import * as React from 'react';
import { Button, Segment, Container, Grid, Image, Icon, Visibility, VisibilityEventData, VisibilityCalculations, Ref } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import Antiques from "../../assets/Antiques_about.jpg"
interface Props {

}

const HomeImage = styled(Image)`
    /* height: 150px; */
    margin-left: auto;
    margin-right: auto;
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
const AboutHeadingTextDiv = styled(motion.div)`
margin-left: 10%;
margin-right: 10%;
margin-top: 20% !important;
margin-bottom: 100px;
font-family: "cinzel";
font-size: 36px;
color: #ccaa66;
text-shadow: 1px 1px 1px black;
`

const AboutSubHeadingTextDiv = styled(motion.div)`
margin-left: 20%;
margin-right: 20%;
margin-top: 0px;
margin-bottom: auto;
font-family: sans-serif;
font-size: 16px;
color: white;
`

const BlankDiv = styled(motion.div)`
background-color: #334a60;
width: 100%;
height: 100%;
position: absolute;
    top: 0;
    /* right: 0; */
    float: right;
`

export const About: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const homePixelsPassed = useAppSelector((state) => state.navigation.homePixelsPassed)
    const homeBottomPassed = useAppSelector((state) => state.navigation.homeBottomPassed)

    const dispatch = useAppDispatch()

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }

    const blankDivVariants = {
        hidden: { width: "100%" },
        visible: { width: "0%" },
    }

    const textVariants = {
        hidden: { opacity: 0, y: "-75px", /* x: -50 */ },
        visible: { opacity: 1, y: "0px", /* x: 0 */ },
    }

    /* const [visibility, setVisibility] = React.useState<VisibilityCalculations>(
        {
            direction: 'down',
            height: 0,
            width: 0,
            topPassed: false,
            bottomPassed: false,
            pixelsPassed: 0,
            percentagePassed: 0,
            topVisible: false,
            bottomVisible: false,
            fits: false,
            passing: false,
            onScreen: false,
            offScreen: false,
        }) */

    /* const contextRef = React.createRef<HTMLElement>() */

    const handleUpdate = ((nothing: null, data: VisibilityEventData) => {
        /* setVisibility(data.calculations) */
        dispatch(navigationSlice.actions.setAboutHeight(data.calculations.height))
        dispatch(navigationSlice.actions.setAboutPixelsPassed(data.calculations.pixelsPassed))
        dispatch(navigationSlice.actions.setAboutBottomPassed(data.calculations.bottomPassed))
    })

    const visibility = () => {
        if (homePixelsPassed >= 100 || homeBottomPassed === true ) {
            return true
        } else return false
    }

    console.log(homePixelsPassed)
    /* console.log(visibility) */

    return (

        <Visibility offset={[0, 0]} onUpdate={handleUpdate}>
            <motion.div
                animate={showSidebar ? "visible" : "hidden"}
                variants={panelVariants}
                transition={{ duration: 0.5 }}
            >
                <Grid style={{ backgroundColor: "#334a60", marginTop: 0, marginBottom: 0 }}>
                    <AboutGridRow >
                        <Grid.Column style={{ display: "flex" }} width={6}>
                            <AboutTextDiv>
                                <AboutHeadingTextDiv animate={visibility() ? "visible" : "hidden"} variants={textVariants} transition={{ duration: 1, delay: 0.1 }}>
                                    About Us
                                </AboutHeadingTextDiv>
                                <AboutSubHeadingTextDiv animate={visibility() ? "visible" : "hidden"} variants={textVariants} transition={{ duration: 1, delay: 0.2 }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </AboutSubHeadingTextDiv>

                            </AboutTextDiv>

                        </Grid.Column>
                        <Grid.Column width={10} style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <HomeImage src={Antiques}></HomeImage>
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
        </Visibility>


    );
};

export default About