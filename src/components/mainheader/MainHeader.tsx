import * as React from 'react';
import { Container, Image, Icon, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform,
    useCycle
} from "framer-motion";
import Logo from "../../assets/Logo 3.png"

import MenuToggle from "./MenuToggle"

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

const HeaderDiv = styled(motion.div)`
    box-shadow: -1px 1px 3px 1px #0000003d;
    position: fixed;
    /* display: block; */
    top: 0;
    left: 0px;
    width: 100%;
    z-index: 1000;
    background-color: white;
    /* transform: unset; */
  `

    const HeaderImage = styled(Image)`
    height: 150px;
    margin-left: auto;
    margin-right: auto;
  `
    const HeaderIcon = styled(Icon)`
    color: #334a60;
    margin-top: auto !important;
    margin-bottom: auto !important;
    margin-left: auto !important;
    margin-right: auto !important;
`
    const FlexGridColumn = styled(Grid.Column)`
    display: flex !important;
    `


interface Props {

}

export const Header: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }

    

    return (
        <HeaderDiv
        animate={showSidebar ? "visible" : "hidden"}
        variants={panelVariants}
        transition={{ duration: 0.5 }} 
        >

            <Grid >
                <Grid.Row>
                    <FlexGridColumn width={4}>
                        {/* <HeaderIcon name='content' size="big" onClick={onMenuSelect}></HeaderIcon> */}
                        
                            <MenuToggle   ></MenuToggle>
                        
                        
                    </FlexGridColumn>
                    <Grid.Column width={8}>
                        <HeaderImage src={Logo}></HeaderImage>
                    </Grid.Column>
                    <Grid.Column width={4}>

                    </Grid.Column>
                </Grid.Row>

            </Grid>




        </HeaderDiv>
    );
};

export default Header