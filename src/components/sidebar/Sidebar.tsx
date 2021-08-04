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

export const Sidebar: React.FunctionComponent<Props> = ({ }) => {

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
        <StyledSidebarDiv
            animate={showSidebar ? "visible" : "hidden"}
            variants={panelVariants}
            transition={{ duration: 0.5 }}>
        
            <div style={{ width: "250px", height: "100px" }}></div>
            <StyledMenuItem onClick={() => handleItemClick("home")}>
                <StyledMenuHeading animate={selectedItem === "home" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Home</StyledMenuHeading>
                {/* <Icon name='home' /> */}


            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleItemClick("about")}>
                {/* <Icon name='gamepad' /> */}
                <StyledMenuHeading animate={selectedItem === "about" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>About</StyledMenuHeading>

            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleItemClick("collections")}>
                {/* <Icon name='camera' /> */}
                <StyledMenuHeading animate={selectedItem === "collections" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Collections</StyledMenuHeading>

            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleItemClick("contact")}>
                {/* <Icon name='camera' /> */}
                <StyledMenuHeading animate={selectedItem === "contact" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Contact</StyledMenuHeading>

            </StyledMenuItem>
            <StyledLineDiv
                layout
                animate={getLineVariant()}
                /* variants={lineVariants} */
                transition={{ duration: 0.5 }}
            ></StyledLineDiv>

        </StyledSidebarDiv>


    );
};

export default Sidebar