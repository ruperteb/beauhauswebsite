import { motion } from 'framer-motion';
import * as React from 'react';
import { Button, Grid, Image, Icon} from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectHomePixelsPassed } from '../../redux/slices/navigationSlice';

import Antiques from "../../assets/Antiques_home.jpg"

import useResizeObserver from "@react-hook/resize-observer";

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
`
const HomeHeadingTextDiv = styled.h1`
margin-left: 10%;
margin-right: 10%;
margin-top: auto !important;
margin-bottom: 60px;
font-family: "cinzel";
font-size: 36px;
/* color: #ccaa66; */
color: #084b6d;
/* text-shadow: 1px 1px 1px black; */
text-shadow: 1px 1px 1px #eadede;

`

const HomeSubHeadingTextDiv = styled.div`
margin-left: 20%;
margin-right: 20%;
margin-top: 0px;
margin-bottom: 60px;
font-family: sans-serif;
font-size: 16px;
/* color: white; */
color: #084b6d;
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
/* color: white  !important; */
color: #084b6d  !important;
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: 2px  !important;
/* border-color: #a29064  !important; */
border-color: #084b6d  !important;
background-color: transparent  !important;
-webkit-transition: color 200ms ease, background-color 200ms ease  !important;
transition: color 200ms ease, background-color 200ms ease  !important;
border-radius: 0 !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
&:hover {
color: white !important;
/* color: white !important;
background-color: #a29064 !important;
border-color: #a29064 !important;
box-shadow: -1px 1px 1px 2px #0000001f !important; */
background-color: #084b6d !important;
border-color: #084b6d !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
  }
`


export const Home: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const homePixelsPassed = useAppSelector(selectHomePixelsPassed)
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        if(homePixelsPassed >=400)
        dispatch(navigationSlice.actions.setCurrentPageURL("#home"))
    },[homePixelsPassed])

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }


    const homeRef = React.useRef<HTMLDivElement>(null)

      useResizeObserver(homeRef, (entry) => {
        dispatch(navigationSlice.actions.setHomeHeight(entry.contentRect.height))
    });

     
    return (
        
            <motion.div
                ref={homeRef}
                animate={showSidebar ? "visible" : "hidden"}
                variants={panelVariants}
                transition={{ duration: 0.5 }}
            >
                <Grid stackable style={{ marginTop: "125px", marginLeft: 0, marginBottom: 0, /* backgroundColor: "#334a60" */ /* backgroundColor: "#b8c8bd" */ backgroundColor: "#bfd5cb" }}>
                    <HomeGridRow >
                        <Grid.Column width={10} style={{paddingLeft: 0}}>
                            <HomeImage src={Antiques}></HomeImage>
                        </Grid.Column>
                        <Grid.Column style={{ display: "flex" }} width={6}>
                            <HomeTextDiv>
                                <HomeHeadingTextDiv>
                                    Purveyors of antique furniture, art and vintage collectibles.
                                </HomeHeadingTextDiv>
                                <HomeSubHeadingTextDiv>
                                    Our curated selection of items covers a range of styles, periods and areas of interest:
                                </HomeSubHeadingTextDiv>
                                <HomeButton animated>
                                    <Button.Content visible style={{ marginRight: 0, fontSize: "1.2rem" /* textShadow: "1px 1px 1px black" */ }}>Collections</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' style={{ textShadow: "1px 1px 1px black" }} />
                                    </Button.Content>
                                </HomeButton>
                            </HomeTextDiv>

                        </Grid.Column>
                    </HomeGridRow>
                </Grid>
            </motion.div>
       


    );
};

export default Home