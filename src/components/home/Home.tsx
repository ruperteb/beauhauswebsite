import { motion } from 'framer-motion';
import * as React from 'react';
import { Button, Segment, Container, Grid, Image, Icon, Visibility, VisibilityEventData } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import Antiques from "../../assets/Antiques_home.jpg"
interface Props {

}

const HomeImage = styled(Image)`
    /* height: 150px; */
    margin-left: auto;
    margin-right: auto;
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
color: #ccaa66;
text-shadow: 1px 1px 1px black;
`

const HomeSubHeadingTextDiv = styled.div`
margin-left: 20%;
margin-right: 20%;
margin-top: 0px;
margin-bottom: 60px;
font-family: sans-serif;
font-size: 16px;
color: white;
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
color: white  !important;
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: 2px  !important;
border-color: #a29064  !important;
background-color: transparent  !important;
-webkit-transition: color 200ms ease, background-color 200ms ease  !important;
transition: color 200ms ease, background-color 200ms ease  !important;
border-radius: 0 !important;
box-shadow: -1px 1px 1px 2px #0000001f !important;
&:hover {
color: white !important; // <Thing> when hovered
background-color: #a29064 !important;
border-color: #a29064 !important;
box-shadow: -1px 1px 1px 2px #0000001f !important;
  }
`


export const Home: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const dispatch = useAppDispatch()

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }

    const handleUpdate = ((nothing: null, data: VisibilityEventData) => {
        /* setVisibility(data.calculations) */
        dispatch(navigationSlice.actions.setHomeHeight(data.calculations.height))
        dispatch(navigationSlice.actions.setHomePixelsPassed(data.calculations.pixelsPassed))
        dispatch(navigationSlice.actions.setHomeBottomPassed(data.calculations.bottomPassed))
    })

    return (
        <Visibility offset={[0, 0]} onUpdate={handleUpdate}>
            <motion.div
                animate={showSidebar ? "visible" : "hidden"}
                variants={panelVariants}
                transition={{ duration: 0.5 }}
            >
                <Grid style={{ marginTop: "150px", marginBottom: 0, backgroundColor: "#334a60" }}>
                    <HomeGridRow >
                        <Grid.Column width={10}>
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
                                    <Button.Content visible style={{ marginRight: 0, textShadow: "1px 1px 1px black" }}>Collections</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' style={{ textShadow: "1px 1px 1px black" }} />
                                    </Button.Content>
                                </HomeButton>
                            </HomeTextDiv>

                        </Grid.Column>
                    </HomeGridRow>
                </Grid>
            </motion.div>
        </Visibility>


    );
};

export default Home