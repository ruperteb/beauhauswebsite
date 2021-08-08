import * as React from 'react';
import { Button, Segment, Container, Grid, Image, Icon, Visibility, VisibilityEventData, VisibilityCalculations, Ref, GridColumn } from 'semantic-ui-react'
import styled from 'styled-components'

import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";


import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectCollectionsPixelsPassed, selectAboutPixelsPassed } from '../../redux/slices/navigationSlice';

import Furniture from "../../assets/Antiques_furniture.jpg"
import Art from "../../assets/Antiques_art.jpg"
import Lighting from "../../assets/Antiques_lighting.jpg"
import Collectibles from "../../assets/Antiques_collectibles.jpg"

interface Props {

}

const HomeImage = styled(Image)`
    /* height: 150px; */
    margin-left: auto;
    margin-right: auto;
   /*  position: relative;
    z-index: -1; */
  `
const CollectionsGridRow = styled(Grid.Row)`
padding-bottom: 0px !important;
padding-top: 0px !important;
`

const CollectionsHeadingTextDiv = styled(motion.h1)`
margin-left: auto;
margin-right: auto;
margin-top: 2em !important;
margin-bottom: 1em !important;
font-family: "cinzel";
font-size: 36px;
/* color: #ccaa66;
text-shadow: 1px 1px 1px black; */
color: #084b6d;
text-shadow: 1px 1px 1px #eadede;
`

const CollectionstCardDiv = styled(motion.div)`
display: flex;
flex-direction: column;
padding: 2rem;
background-color: rgb(184 200 189 / 35%);
border-radius: 30px;
margin-left: 1rem;
margin-right: 1rem;
margin-top: 1rem;
margin-bottom: 1rem;
box-shadow: 1px 1px 2px 1px rgb(34 36 38 / 15%);
border: 1px solid rgba(34,36,38,.15);
transition: transform 200ms ease, -webkit-transform 200ms ease;
cursor: pointer;
&:hover {
    transform: scale(0.97);
}
`

const CollectionstCardImage = styled(Image)`
height: 300px;
width: 450px;
border-radius: 30px;
`

const CollectionsCardSubHeading = styled.div`
margin-left: auto;
margin-right: auto;
margin-top: 2rem;
margin-bottom: 1rem;
font-family: "cinzel";
font-size: 36px;
/* color: #ccaa66;
text-shadow: 1px 1px 1px black; */
color: #084b6d;
text-shadow: 1px 1px 1px #eadede;
`



export const Collections: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)

    /* const windowHeight = useAppSelector((state) => state.navigation.windowHeight)
    const headerHeight = useAppSelector((state) => state.navigation.headerHeight)
    const homeHeight = useAppSelector((state) => state.navigation.homeHeight)
    const aboutHeight = useAppSelector((state) => state.navigation.aboutHeight)
    const collectionsHeight = useAppSelector((state) => state.navigation.collectionsHeight)
    
    console.log(windowHeight, headerHeight, homeHeight, aboutHeight, collectionsHeight ) */

    const dispatch = useAppDispatch()

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }

    const x = useMotionValue(0);
    const xInput = [0, 500];
    const opacityRange = [0, 1]
    const yRange = [100, 0]

    const opacity = useTransform(x, xInput, opacityRange)
    const y = useTransform(x, xInput, yRange)

    const collectionsPixelsPassed = useAppSelector(selectCollectionsPixelsPassed)

    React.useEffect(() => {
        x.set(collectionsPixelsPassed - 175 /* i.e. offset */)
    }, [collectionsPixelsPassed])

    const collectionsRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {
        if (collectionsRef.current)
            dispatch(navigationSlice.actions.setCollectionsHeight(collectionsRef.current?.getBoundingClientRect().height))
    }, [])



    return (
        <motion.div
            ref={collectionsRef}
            animate={showSidebar ? "visible" : "hidden"}
            variants={panelVariants}
            transition={{ duration: 0.5 }}
            style={{marginBottom: "3rem"}}
        >
            <motion.div
                style={{ opacity, y }}
            >
                <Container>
                    <Grid stackable style={{ /* backgroundColor: "#334a60" */ backgroundColor: "white", marginTop: 0, marginBottom: 0 }}>
                        <CollectionsGridRow>
                            <CollectionsHeadingTextDiv>
                                Our Collections:
                            </CollectionsHeadingTextDiv>
                        </CollectionsGridRow>
                        <CollectionsGridRow >

                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={8}>
                                <CollectionstCardDiv /* style={{marginRight: "20px"}} */>
                                    <CollectionstCardImage src={Furniture}></CollectionstCardImage>
                                    <CollectionsCardSubHeading>Furniture</CollectionsCardSubHeading>
                                </CollectionstCardDiv>

                            </Grid.Column>
                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={8}>
                                <CollectionstCardDiv /* style={{marginLeft: "20px"}} */>
                                    <CollectionstCardImage src={Art}></CollectionstCardImage>
                                    <CollectionsCardSubHeading>Art</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>

                        </CollectionsGridRow>
                        <CollectionsGridRow >

                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={8}>
                                <CollectionstCardDiv /* style={{marginRight: "20px"}} */>
                                    <CollectionstCardImage src={Lighting}></CollectionstCardImage>
                                    <CollectionsCardSubHeading>Lighting</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>
                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={8}>
                                <CollectionstCardDiv /* style={{marginLeft: "20px"}} */>
                                    <CollectionstCardImage src={Collectibles}></CollectionstCardImage>
                                    <CollectionsCardSubHeading>Collectibles</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>

                        </CollectionsGridRow>
                    </Grid>

                </Container>
            </motion.div>
        </motion.div>
    );
};

export default Collections