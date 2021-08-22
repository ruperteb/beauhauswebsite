import * as React from 'react';

import {
    motion
} from "framer-motion";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'

import styled from 'styled-components'

import AntiquesList from "./AntiquesList"
import AntiquesListMobile from "./AntiquesListMobile"
import CollectionsPanelNavigation from './CollectionsPanelNavigation';
import CollectionsPanelNavigationMobile from './CollectionsPanelNavigationMobile';
import AntiqueModal from './AntiqueModal';
import AntiqueModalMobile from './AntiqueModalMobile';
import { callbackify } from 'util';

import { useMediaQuery } from 'react-responsive'

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
    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)

    const headerHeight = useAppSelector((state) => state.navigation.headerHeight -25)



    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: `-100vw` },
        sidebarVisible: {x: `calc(-100vw + 260px)`}
    }

    const checkAnimationVariant = () => {
        if (showCollectionsPanel === true && showSidebar === true) {
            window.gtag('event', 'screen_view', { 'screen_name': 'CollectionsPanel'});
            return "sidebarVisible"
        } else if (showCollectionsPanel === true) {
            return "visible"
        } else return "hidden"

    }

    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" })

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <StyledCollectionsPanelDiv
            headerHeight={headerHeight}
            animate={checkAnimationVariant()}
            variants={panelVariants}
            transition={{ duration: 0.5 }}>

            {isDesktopOrLaptop && 
            <>
            <CollectionsPanelNavigation></CollectionsPanelNavigation>
            <AntiquesList></AntiquesList>
            <AntiqueModal></AntiqueModal>
            </>
            }
            {isTabletOrMobile && 
            <>
            <CollectionsPanelNavigationMobile></CollectionsPanelNavigationMobile>
            <AntiquesListMobile></AntiquesListMobile>
            <AntiqueModalMobile></AntiqueModalMobile>
            </>
            }
        </StyledCollectionsPanelDiv>
    );
};

export default CollectionsPanel