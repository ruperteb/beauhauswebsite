import * as React from 'react';

import {
    motion
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



interface Props {

}

export const CollectionsPanel: React.FunctionComponent<Props> = ({ }) => {

    const showCollectionsPanel = useAppSelector((state) => state.navigation.showCollectionsPanel)

    const headerHeight = useAppSelector((state) => state.navigation.headerHeight -25)



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