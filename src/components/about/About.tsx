import { motion } from 'framer-motion';
import * as React from 'react';
import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectAboutPixelsPassed, selectHomePixelsPassed } from '../../redux/slices/navigationSlice';

import useResizeObserver from "@react-hook/resize-observer";

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

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
font-family: ${props => props.theme.primaryTextFont};
font-size: 36px;
/* color: #ccaa66;
text-shadow: 1px 1px 1px black; */
color: ${props => props.theme.primaryTextColor};
text-shadow: 1px 1px 1px #eadede;
`

const AboutSubHeadingTextDiv = styled(motion.div)`
margin-left: 20%;
margin-right: 20%;
margin-top: 0px;
margin-bottom: auto;
font-family: ${props => props.theme.secondaryTextFont};
font-size: 16px;
/* color: white; */
color: ${props => props.theme.primaryTextColor};
`

const BlankDiv = styled(motion.div)`
/* background-color: #334a60; */
/* background-color: #b8c8bd; */
background-color: ${props => props.theme.primaryColor};
width: 100%;
height: 100%;
position: absolute;
    top: 0;
    /* right: 0; */
    float: right;
`

const StyledGrid = styled(Grid)`
    &&&&& {
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 0;
    /* backgroundColor: "#334a60" */ /* backgroundColor: "#b8c8bd" */ 
    background-color: ${props => props.theme.primaryColor};
}
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

    React.useEffect(() => {
        if (aboutPixelsPassed >= 400)
            dispatch(navigationSlice.actions.setCurrentPageURL("#about"))
    }, [aboutPixelsPassed])

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

    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.REACT_APP_CLOUD_NAME
        }
    });

    const aboutImage = cld.image("Antiques_about_gaw4k6");

    var imageHeight = window.innerHeight
    var imageWidth = (window.innerWidth * 0.7).toFixed()

    aboutImage.resize(fill().width(imageWidth).height(imageHeight)).delivery(format(auto()))
        .delivery(quality(qAuto()));

    return (
        <motion.div
            style={{ width: "100vw" }}
            ref={aboutRef}
            animate={checkAnimationVariant()}
            variants={panelVariants}
            transition={{ duration: 0.5 }}
        >
            <StyledGrid stackable>
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
                        <AdvancedImage style={{ display: "flex" }} cldImg={aboutImage}  /* plugins={[lazyload('10px 20px 10px 30px', 0.25)]} */ />

                        <BlankDiv
                            animate={visibility() ? "visible" : "hidden"}
                            variants={blankDivVariants}
                            transition={{ duration: 0.9 }}
                        >

                        </BlankDiv>
                    </Grid.Column>

                </AboutGridRow>
            </StyledGrid>
        </motion.div>
    );
};

export default About