import { motion } from 'framer-motion';
import * as React from 'react';
import { Button, Grid, Image, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectHomePixelsPassed } from '../../redux/slices/navigationSlice';


import useResizeObserver from "@react-hook/resize-observer";

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

interface Props {

}

const HomeImage = styled(Image)`
    /* height: 150px; */
    margin-left: auto;
    margin-right: auto;
    min-height: 500px;
   /*  position: relative;
    z-index: -1; */
  `
const HomeGridRow = styled(Grid.Row)`
padding-bottom: 0px !important;
padding-top: 0px !important;
`

const HomeTextDiv = styled.div`
display: flex;
flex-direction: column;
margin-right: 10%;
`
const HomeHeadingTextDiv = styled.h1`
display: flex;
    flex-direction: column;
    flex-wrap: wrap;
margin-left: auto;
margin-right: auto;
margin-top: auto !important;
margin-bottom: 60px;
font-family: ${props => props.theme.primaryTextFont};
font-size: 36px;
/* color: #ccaa66; */
color: ${props => props.theme.primaryTextColor};
/* text-shadow: 1px 1px 1px black; */
text-shadow: 1px 1px 1px #eadede;

`

const HomeHeadingText = styled.p`
display: flex;
    margin: 0px auto;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
`

const HomeHeadingTextBold = styled.b`
color: white;
text-shadow: 1px 1px 1px #3e7061;
`

const HomeSubHeadingTextDiv = styled.div`
margin-left: auto;
margin-right: auto;
margin-top: 0px;
margin-bottom: 2rem;
font-family: ${props => props.theme.secondaryTextFont};
font-size: 16px;
/* color: white; */
color: ${props => props.theme.primaryTextColor};
`

const HomeButton = styled(Button)`
margin-left: auto !important;
margin-right: auto !important;
margin-top: 0px;
margin-bottom: auto !important;
&&&& {
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
}

font-family: sans-serif;
font-size: 16px;
color: ${props => props.theme.primaryButtonTextColor}  !important;
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: ${props => props.theme.buttonBorderWidth}  !important;
border-color: ${props => props.theme.buttonBorderColor}  !important;
background-color: ${props => props.theme.primaryButtonBackgroundColor}  !important;
-webkit-transition: color 200ms ease, background-color 200ms ease  !important;
transition: color 200ms ease, background-color 200ms ease  !important;
border-radius: 0 !important;
box-shadow: ${props => props.theme.buttonBoxShadow} !important;
&:hover {
color: ${props => props.theme.secondaryButtonTextColor} !important;
background-color: ${props => props.theme.secondaryButtonBackgroundColor} !important;
border-color: ${props => props.theme.buttonBorderColor} !important;
box-shadow: ${props => props.theme.buttonBoxShadow} !important;
  }
`

const StyledGrid = styled(Grid)`
    &&&&& {
    margin-top: 125px;
    margin-left: 0;
    margin-bottom: 0;
    /* backgroundColor: "#334a60" */ /* backgroundColor: "#b8c8bd" */ 
    background-color: ${props => props.theme.primaryColor};
}
`


export const Home: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const homePixelsPassed = useAppSelector(selectHomePixelsPassed)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (homePixelsPassed >= 400)
            dispatch(navigationSlice.actions.setCurrentPageURL("#home"))
            window.gtag('event', 'page_view', {
                page_title: 'Home',
               /*  page_location: '<Page Location>', */
                page_path: '/#home',
                send_to: process.env.REACT_APP_GA_MEASUREMENT_ID
              })
    }, [homePixelsPassed])

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }


    const homeRef = React.useRef<HTMLDivElement>(null)

    useResizeObserver(homeRef, (entry) => {
        dispatch(navigationSlice.actions.setHomeHeight(entry.contentRect.height))
    });


    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.REACT_APP_CLOUD_NAME
        }
    });



    // cld.image returns a CloudinaryImage with the configuration set.
    const homeImage = cld.image("Antiques_home_srmuhc");

    var imageHeight = window.innerHeight - 125

    homeImage.resize(fill()/* .width(675) */.height(imageHeight)).delivery(format(auto()))
        .delivery(quality(qAuto()));

    const homeHeight = useAppSelector((state) => state.navigation.homeHeight)
    const aboutHeight = useAppSelector((state) => state.navigation.aboutHeight)


    const handleLinkClick = (selection: string) => {

        window.scrollTo({ behavior: 'smooth', top: homeHeight + aboutHeight + 25 })

    }



    return (

        <motion.div
            style={{ width: "100vw" }}
            ref={homeRef}
            animate={showSidebar ? "visible" : "hidden"}
            variants={panelVariants}
            transition={{ duration: 0.5 }}
        >
            <StyledGrid stackable>
                <HomeGridRow >
                    <Grid.Column width={10} style={{ paddingLeft: 0 }}>
                        {/* <HomeImage src={Antiques}></HomeImage> */}
                        <AdvancedImage style={{ display: "flex" }} cldImg={homeImage}  /* plugins={[lazyload('10px 20px 10px 30px', 0.25)]} */ />
                    </Grid.Column>
                    <Grid.Column style={{ display: "flex" }} width={6}>
                        <HomeTextDiv>
                            <HomeHeadingTextDiv>
                                {/* Purveyors of antique furniture, art and vintage collectibles. */}
                                <HomeHeadingText>Welcome to&nbsp;<HomeHeadingTextBold>BEAUHAUS</HomeHeadingTextBold>,</HomeHeadingText>
                                
                                <HomeHeadingText>a novel and eclectic collection of wonderful artefacts</HomeHeadingText>
                            </HomeHeadingTextDiv>
                            <HomeSubHeadingTextDiv >
                                {/* Our curated selection of items covers a range of styles, periods and areas of interest: */}
                                We love and appreciate the skill and craftsmanship of the artisan. We revel in the history and life of each precious item.
                            </HomeSubHeadingTextDiv>
                            <HomeSubHeadingTextDiv style={{marginBottom: "3rem"}}>
                            Great design is more than just style, it has soul.
                            </HomeSubHeadingTextDiv>
                            <HomeButton onClick={handleLinkClick} animated>
                                <Button.Content visible style={{ marginRight: 0, fontSize: "1.2rem" /* textShadow: "1px 1px 1px black" */ }}>Our Collections</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' style={{ textShadow: "1px 1px 1px black" }} />
                                </Button.Content>
                            </HomeButton>
                        </HomeTextDiv>

                    </Grid.Column>
                </HomeGridRow>
            </StyledGrid>
        </motion.div>



    );
};

export default Home