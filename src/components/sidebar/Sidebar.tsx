import * as React from 'react';

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import styled from 'styled-components'

const StyledSidebarDiv = styled(motion.div)`
    background-color: white;
    display: flex;
    position: fixed;
    top: 0;
    left:-260px;
    flex-wrap: wrap;
    flex-direction: column;
    width: 260px;
    height: 100vh;
    /* border: 1px solid rgba(34,36,38,.15); */
    z-index: 2000;
    box-shadow: 1px 1px 3px 2px #0000003d;
  `
const StyledSidebarInnerDiv = styled.div`
    background-color: #786963;
    height: 100%;
    width: 100%;
    height: 100vh;
`

const StyledMenuItem = styled(motion.div)`
    /* background-color: #1e5c9738; */
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
    font-family: ${props => props.theme.primaryTextFont};
    font-size: 25px;
    color: #1d0c12;
    letter-spacing: 2px;
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
    const homeHeight = useAppSelector((state) => state.navigation.homeHeight)
    const aboutHeight = useAppSelector((state) => state.navigation.aboutHeight)
    const collectionsHeight = useAppSelector((state) => state.navigation.collectionsHeight)

    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)

    const showCollectionsPanel = useAppSelector((state) => state.navigation.showCollectionsPanel)

    const dispatch = useAppDispatch()

    const [selectedItem, setSelectedItem] = React.useState<string | undefined>("home")

    React.useEffect(() => {
        switch (selectedItem) {
            case "#home":
                window.scrollTo({ behavior: 'smooth', top: 0 })
                break;
            case "#about":
                window.scrollTo({ behavior: 'smooth', top: homeHeight + 25 })
                break;
            case "#collections":
                window.scrollTo({ behavior: 'smooth', top: homeHeight + aboutHeight + 25 })
                break;
            case "#contact":
                window.scrollTo({ behavior: 'smooth', top: homeHeight + aboutHeight + collectionsHeight + 100 })
                break;
            default:
                window.scrollTo({ behavior: 'smooth', top: 0 })
        }

    }, [selectedItem])

    const handleItemClick = (selection: string) => {
        
        if (showCollectionsPanel) {
            dispatch(navigationSlice.actions.setCollectionsPanelVisibility(false))
            document.body.style.overflowY = "visible"
            const timer = setTimeout(() => {
                setSelectedItem(selection)
                dispatch(navigationSlice.actions.setCurrentPageURL(selection))

                switch (selection) {
                    case "#home":
                        window.scrollTo({ behavior: 'smooth', top: 0 })
                        break;
                    case "#about":
                        window.scrollTo({ behavior: 'smooth', top: homeHeight + 25 })
                        break;
                    case "#collections":
                        window.scrollTo({ behavior: 'smooth', top: homeHeight + aboutHeight + 25 })
                        break;
                    case "#contact":
                        window.scrollTo({ behavior: 'smooth', top: homeHeight + aboutHeight + collectionsHeight + 100 })
                        break;
                    default:
                        window.scrollTo({ behavior: 'smooth', top: 0 })
                }
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setSelectedItem(selection)
            dispatch(navigationSlice.actions.setCurrentPageURL(selection))

            switch (selection) {
                case "#home":
                    window.scrollTo({ behavior: 'smooth', top: 0 })
                    break;
                case "#about":
                    window.scrollTo({ behavior: 'smooth', top: homeHeight + 25 })
                    break;
                case "#collections":
                    window.scrollTo({ behavior: 'smooth', top: homeHeight + aboutHeight + 25 })
                    break;
                case "#contact":
                    window.scrollTo({ behavior: 'smooth', top: homeHeight + aboutHeight + collectionsHeight + 100 })
                    break;
                default:
                    window.scrollTo({ behavior: 'smooth', top: 0 })
            }
        }



    }

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }

    const menuTextVariants = {
        selected: { color: "#ffffff" },
        unselected: { color: "#1d0c12" },

    }

    const lineVariants = {
        home: { y: "0px" },
        about: { y: "58px" },
        collections: { y: "116px" },
        contact: { y: "174px" },
    }

    const getLineVariant = () => {
        switch (currentPageURL) {
            case "#home":
                return lineVariants.home
            case "#about":
                return lineVariants.about
            case "#collections":
                return lineVariants.collections
            case "#contact":
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
            <StyledSidebarInnerDiv>
                <div style={{ width: "250px", height: "100px", /* backgroundColor: "#1e5c9738" */ }}></div>
                <StyledMenuItem onClick={() => handleItemClick("#home")}>
                    <StyledMenuHeading animate={currentPageURL === "#home" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Home</StyledMenuHeading>
                    {/* <Icon name='home' /> */}


                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleItemClick("#about")}>
                    {/* <Icon name='gamepad' /> */}
                    <StyledMenuHeading animate={currentPageURL === "#about" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>About</StyledMenuHeading>

                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleItemClick("#collections")}>
                    {/* <Icon name='camera' /> */}
                    <StyledMenuHeading animate={currentPageURL === "#collections" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Collections</StyledMenuHeading>

                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleItemClick("#contact")}>
                    {/* <Icon name='camera' /> */}
                    <StyledMenuHeading animate={currentPageURL === "#contact" ? "selected" : "unselected"} variants={menuTextVariants} transition={{ duration: 0.6 }}>Contact</StyledMenuHeading>

                </StyledMenuItem>
                <StyledLineDiv
                    layout
                    animate={getLineVariant()}
                    /* variants={lineVariants} */
                    transition={{ duration: 0.5 }}
                ></StyledLineDiv>

            </StyledSidebarInnerDiv>


        </StyledSidebarDiv>


    );
};

export default Sidebar