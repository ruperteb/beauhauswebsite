import * as React from 'react';
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    MenuItemProps
} from 'semantic-ui-react'

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'

import styled from 'styled-components'

import AntiquesList from "./AntiquesList"
import CollectionsPanelNavigation from './CollectionsPanelNavigation';
import AntiqueModal from './AntiqueModal';

interface CardProps {
    headerHeight: number,

}

const StyledCollectionsPanelDiv = styled(motion.div) <CardProps>`
    background-color: white;
    display: flex;
    position: fixed;
    top: ${props => `${props.headerHeight}px`};
    left: 100vw;
  //  bottom: ${props => `calc(-100vh + ${props.headerHeight}px)`};
    /* left:0; */
    flex-wrap: wrap;
    flex-direction: row;
    width: 100vw;
    height: ${props => `calc(100vh - ${props.headerHeight}px)`};
    /* border: 1px solid rgba(34,36,38,.15); */
    /* z-index: 1500; */
    box-shadow: 1px 1px 3px 2px #0000003d;
    overflow-y: scroll;
  `
const StyledMenuItem = styled(motion.div)`
    background-color: #334a60;
    width: 250px;
    height: 58px;
    padding-top: 0.928571em;
    padding-right: 1.14286em;
    padding-bottom: 0.928571em;
    padding-left: 1.14286em;
    cursor: pointer;
    &:hover {
    background-color: rgba(0,0,0,.05);
    color: rgba(0,0,0,.95);
    margin-top: 0px;
    margin-bottom: 0px;
  }
`

const StyledMenuHeading = styled(motion.h1)`
    font-family: "cinzel";
    font-size: 25px;
    color: #afaba9;
  `

const StyledLineDiv = styled(motion.div)`
    height: 50px;
    width: 3px;
    background-color: white;
    position: absolute;
    left: 5px;
    top: 100px;
    margin-top: 4px;
    margin-bottom: 4px;
`

interface Props {

}

export const CollectionsPanel: React.FunctionComponent<Props> = ({ }) => {

    const showCollectionsPanel = useAppSelector((state) => state.navigation.showCollectionsPanel)

    const headerHeight = useAppSelector((state) => state.navigation.headerHeight -25)




    /* const panelVariants = {
        hidden: { y: "0px" },
        visible: { y: `calc(-100vh + ${headerHeight}px)` },
    } */

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: `-100vw` },
    }



    return (
        <StyledCollectionsPanelDiv
            headerHeight={headerHeight}
            animate={showCollectionsPanel ? "visible" : "hidden"}
            variants={panelVariants}
            transition={{ duration: 0.5 }}>
            <CollectionsPanelNavigation></CollectionsPanelNavigation>
            <AntiquesList></AntiquesList>
            <AntiqueModal></AntiqueModal>
        </StyledCollectionsPanelDiv>
    );
};

export default CollectionsPanel