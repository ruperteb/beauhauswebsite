import * as React from 'react';
import { CSSProperties } from "react";
import {Container, Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";


import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectCollectionsPixelsPassed, selectAboutPixelsPassed } from '../../redux/slices/navigationSlice';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import {format, quality} from "@cloudinary/base/actions/delivery";
import {auto} from "@cloudinary/base/qualifiers/format";
import {auto as qAuto} from "@cloudinary/base/qualifiers/quality";

interface Props {

}


const CollectionsGridRow = styled(Grid.Row)`
padding-bottom: 0px !important;
padding-top: 0px !important;
`

const CollectionsHeadingTextDiv = styled(motion.h1)`
margin-left: auto;
margin-right: auto;
margin-top: 2em !important;
margin-bottom: 1em !important;
font-family: ${props => props.theme.primaryTextFont};
font-size: 36px;
/* color: #ccaa66;
text-shadow: 1px 1px 1px black; */
color: ${props => props.theme.primaryTextColor};
text-shadow: 1px 1px 1px #eadede;
`

const CollectionstCardDiv = styled(motion.div)`
display: flex;
flex-direction: column;
padding: 2rem;
/* background-color: #cedbe85c; */
border-radius: 30px;
margin-left: 1rem;
margin-right: 1rem;
margin-top: 1rem;
margin-bottom: 1rem;
/* box-shadow: 1px 1px 2px 1px rgb(34 36 38 / 15%);
border: 1px solid rgba(34,36,38,.15); */
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
font-family: ${props => props.theme.primaryTextFont};
font-size: 36px;
/* color: #ccaa66;
text-shadow: 1px 1px 1px black; */
color: ${props => props.theme.primaryTextColor};
text-shadow: 1px 1px 1px #eadede;
`

const StyledGrid = styled(Grid)`
    &&&&& {
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 0;
    /* backgroundColor: "#334a60" */ /* backgroundColor: "#b8c8bd" */ 
    background-color: ${props => props.theme.tertiaryColor};
}
`



export const Collections: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const showCollectionsPanel = useAppSelector((state) => state.navigation.showCollectionsPanel)

    /* const windowHeight = useAppSelector((state) => state.navigation.windowHeight)
    const headerHeight = useAppSelector((state) => state.navigation.headerHeight)
    const homeHeight = useAppSelector((state) => state.navigation.homeHeight)
    const aboutHeight = useAppSelector((state) => state.navigation.aboutHeight)
    const collectionsHeight = useAppSelector((state) => state.navigation.collectionsHeight)
    
    console.log(windowHeight, headerHeight, homeHeight, aboutHeight, collectionsHeight ) */

    const dispatch = useAppDispatch()

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "263px" },
        collectionsVisible: { x: "-100vw" },
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

    React.useEffect(()=> {
        if(collectionsPixelsPassed >=400)
        dispatch(navigationSlice.actions.setCurrentPageURL("#collections"))
        window.gtag('event', 'screen_view', { 'screen_name': 'Collections'});
    },[collectionsPixelsPassed])

    const collectionsRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {
        if (collectionsRef.current)
            dispatch(navigationSlice.actions.setCollectionsHeight(collectionsRef.current?.getBoundingClientRect().height))
    }, [])

    const handleCardClick = (type: string) => {
        dispatch(collectionsSlice.actions.setTypeFilter(type))
        dispatch(navigationSlice.actions.setCollectionsPanelVisibility(true))
        document.body.style.overflowY = "hidden"

    }

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


    const furnitureImage = cld.image("Antiques_furniture_okpb1m");
    const artImage = cld.image("Antiques_art_cqy3cl");
    const lightingImage = cld.image("Antiques_lighting_dwpoja");
    const collectiblesImage = cld.image("Antiques_collectibles_skr3yx");
    const carpetsImage = cld.image("Antiques_carpet_asjpkt");
    const mirrorsImage = cld.image("Antiques_mirror_hctfpz");
    const objetdartImage = cld.image("Antiques_objetd_art_hrirad");
    const miscImage = cld.image("Antiques_home_srmuhc");

    var imageHeight = "150px"

    furnitureImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    artImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    lightingImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    collectiblesImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    carpetsImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    mirrorsImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    objetdartImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    miscImage.resize(fill().width(225).height(150)).delivery(format(auto()))
    .delivery(quality(qAuto()));

    const imageStyles: CSSProperties = {
        borderRadius: "5px",
        boxShadow: "0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)",
        display: "flex",
        height: imageHeight,
        /* marginTop: "-1rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem", */
      }

    return (
        <motion.div
            ref={collectionsRef}
            animate={checkAnimationVariant()}
            variants={panelVariants}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "3rem" }}
        >
            <motion.div
                style={{ opacity, y }}
            >
                <Container>
                    <StyledGrid stackable>
                        <CollectionsGridRow>
                            <CollectionsHeadingTextDiv>
                                Our Collections
                            </CollectionsHeadingTextDiv>
                        </CollectionsGridRow>
                        <CollectionsGridRow  >

                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("furniture")}>
                                <AdvancedImage style={imageStyles} cldImg={furnitureImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Furniture</CollectionsCardSubHeading>
                                </CollectionstCardDiv>

                            </Grid.Column>
                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("art")}>
                                <AdvancedImage style={imageStyles} cldImg={artImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Art</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>

                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("lighting")}>
                                <AdvancedImage style={imageStyles} cldImg={lightingImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Lighting</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>
                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("collectibles")}>
                                <AdvancedImage style={imageStyles} cldImg={collectiblesImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Collectibles</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>

                        </CollectionsGridRow>
                        <CollectionsGridRow >

                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("carpets")}>
                                <AdvancedImage style={imageStyles} cldImg={carpetsImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Carpets & </CollectionsCardSubHeading>
                                    <CollectionsCardSubHeading style={{marginTop: "0.5rem"}}>Rugs</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>
                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("mirrors")}>
                                <AdvancedImage style={imageStyles} cldImg={mirrorsImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Mirrors</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>
                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("objetdart")}>
                                <AdvancedImage style={imageStyles} cldImg={objetdartImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Objet d'art</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>
                            <Grid.Column style={{ display: "flex", justifyContent: "center" }} width={4}>
                                <CollectionstCardDiv onClick={() => handleCardClick("misc")}>
                                <AdvancedImage style={imageStyles} cldImg={miscImage}  plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
                                    <CollectionsCardSubHeading>Miscellaneous</CollectionsCardSubHeading>
                                </CollectionstCardDiv>
                            </Grid.Column>

                        </CollectionsGridRow>
                    </StyledGrid>

                </Container>
            </motion.div>
        </motion.div>
    );
};

export default Collections