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

const StyledSidebarDiv = styled(motion.div)`
    background-color: #334a60;
    display: flex;
    position: fixed;
    top: 0;
    left:-260px;
    flex-wrap: wrap;
    flex-direction: column;
    width: 260px;
    height: 100vh;
    border: 1px solid rgba(34,36,38,.15);
    z-index: 2000;
    box-shadow: 1px 1px 3px 2px #0000003d;
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

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)

    const [selectedItem, setSelectedItem] = React.useState<string | undefined>("home")

    const handleItemClick = (selection: string) => {
        setSelectedItem(selection)

    }

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }

    const menuTextVariants = {
        selected: { color: "#ffffff" },
        unselected: { color: "#ccaa66" },

    }

    const lineVariants = {
        home: { y: "0px" },
        about: { y: "58px" },
        collections: { y: "116px" },
        contact: { y: "174px" },
    }

    const getLineVariant = () => {
        switch (selectedItem) {
            case "home":
                return lineVariants.home
            case "about":
                return lineVariants.about
            case "collections":
                return lineVariants.collections
            case "contact":
                return lineVariants.contact
            default:
                return lineVariants.home
        }
    }

    return (

        <AntiquesList></AntiquesList>

    );
};

export default CollectionsPanel