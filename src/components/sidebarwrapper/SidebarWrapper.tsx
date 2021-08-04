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
    Sidebar,
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

import "./SidebarWrapper.css"

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
    children: React.ReactNode
}

export const SidebarWrapper: React.FunctionComponent<Props> = ({ children }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)

    const [selectedItem, setSelectedItem] = React.useState<string | undefined>("home")

    const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) => {
        setSelectedItem(data.name)

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
        <Sidebar.Pushable /* as={Segment} */ style={{ overflow: 'hidden'}}>
            <Sidebar
                as={Menu}
                animation={"push"}
                direction={"left"}
                /* icon='labeled' */
                /* inverted */
                vertical
                /* pointing */
                /* secondary */
                visible={showSidebar}
                style={{ backgroundColor: "#334a60" }}
            /* width='wide' */
            >
                <Menu.Item style={{ width: "250px", height: "100px" }}></Menu.Item>
                <Menu.Item
                    as='a'
                    name='home'
                    active={selectedItem === 'home'}
                    onClick={handleItemClick}
                    style={{ width: "250px" }}
                >
                    <StyledMenuHeading animate={selectedItem === "home" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Home</StyledMenuHeading>
                    {/* <Icon name='home' /> */}


                </Menu.Item>
                <Menu.Item
                    as='a'
                    name='about'
                    active={selectedItem === 'about'}
                    onClick={handleItemClick}
                    style={{ width: "250px" }}
                >
                    {/* <Icon name='gamepad' /> */}
                    <StyledMenuHeading animate={selectedItem === "about" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>About</StyledMenuHeading>

                </Menu.Item>
                <Menu.Item
                    as='a'
                    name='collections'
                    active={selectedItem === 'collections'}
                    onClick={handleItemClick}
                    style={{ width: "250px" }}
                >
                    {/* <Icon name='camera' /> */}
                    <StyledMenuHeading animate={selectedItem === "collections" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Collections</StyledMenuHeading>

                </Menu.Item>
                <Menu.Item
                    as='a'
                    name='contact'
                    active={selectedItem === 'contact'}
                    onClick={handleItemClick}
                    style={{ width: "250px" }}
                >
                    {/* <Icon name='camera' /> */}
                    <StyledMenuHeading animate={selectedItem === "contact" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Contact</StyledMenuHeading>

                </Menu.Item>
                <StyledLineDiv
                    layout
                    animate={getLineVariant()}
                    /* variants={lineVariants} */
                    transition={{ duration: 0.5 }}
                ></StyledLineDiv>
            </Sidebar>

            <Sidebar.Pusher /* dimmed={dimmed && visible} */>

                {children}

            </Sidebar.Pusher>

        </Sidebar.Pushable>
    );
};

export default SidebarWrapper