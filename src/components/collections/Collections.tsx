import * as React from 'react';
import { Button, Segment, Container, Grid, Image, Icon, Visibility, VisibilityEventData, VisibilityCalculations, Ref, GridColumn } from 'semantic-ui-react'
import styled from 'styled-components'

import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";


import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, setAboutBottomPassed } from '../../redux/slices/navigationSlice';

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
    transform: scale(0.95);
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
    /* const aboutPixelsPassed = useAppSelector((state) => state.navigation.aboutPixelsPassed)
    const aboutBottomPassed = useAppSelector((state) => state.navigation.aboutBottomPassed) */

    const homeHeight = useAppSelector((state) => state.navigation.homeHeight)
    const aboutHeight = useAppSelector((state) => state.navigation.homeHeight)
    

    const dispatch = useAppDispatch()

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
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
        dispatch(navigationSlice.actions.setCollectionsHeight(data.calculations.height))
        dispatch(navigationSlice.actions.setCollectionsPixelsPassed(data.calculations.pixelsPassed))
        dispatch(navigationSlice.actions.setCollectionsBottomPassed(data.calculations.bottomPassed))
    })

    /* const visibility = () => {
        if (aboutPixelsPassed >= 100 || aboutBottomPassed === true) {
            return true
        } else return false
    } */

    const x = useMotionValue(0);
    const xInput = [0, 500];
    const opacityRange = [0, 1]
    const yRange = [100, 0]

    const opacity = useTransform(x, xInput, opacityRange)
    const y = useTransform(x, xInput, yRange)

    const [scroll, setScroll] = React.useState(0)

    const { scrollY } = useViewportScroll()

    scrollY.onChange(setScroll)


    React.useEffect(() => {
        x.set(scroll + window.innerHeight - 150 /* i.e. header height */ - homeHeight - aboutHeight -100 /* i.e. offset */ )
    }, [scroll])



    return (
        
            <Visibility offset={[0, 0]} onUpdate={handleUpdate}>
                <motion.div

                    animate={showSidebar ? "visible" : "hidden"}
                    variants={panelVariants}
                    transition={{ duration: 0.5 }}
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
            </Visibility>
        


    );
};

export default Collections