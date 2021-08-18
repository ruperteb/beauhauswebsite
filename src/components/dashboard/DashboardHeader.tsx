import * as React from 'react';
import { Image, Icon, Grid, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform,
    useCycle,
    useMotionValue,
} from "framer-motion";

import { useAuth0 } from "@auth0/auth0-react";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

export interface StyledProps {

    height: string;
}

const HeaderDiv = styled(motion.div)`
    box-shadow: -1px 1px 3px 1px #0000003d;
    position: fixed;
    /* display: block; */
    top: 0;
    left: 0px;
    width: 100vw;
    z-index: 1000;
    background-color: white;
   /*  height: 100px; */
    /* transform: unset; */
  `

const HeaderLogoText = styled(motion.h1)`
    &&&&&& {
    font-family: 'Bodoni Moda', serif;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 400;
    letter-spacing: 2px;
    margin: auto;
    }
`

const HeaderImage = styled(Image)`
    /* height: ${(p: StyledProps) => p.height}; */
    height: 100%;
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

export const DashboardHeader: React.FunctionComponent<Props> = ({ }) => {

    const { logout, user, loginWithRedirect, isAuthenticated } = useAuth0()
    const dispatch = useAppDispatch()

    return (
        <HeaderDiv

        >

            <Grid >
                <Grid.Row>
                    <FlexGridColumn width={4}>
                        {/* <HeaderIcon name='content' size="big" onClick={onMenuSelect}></HeaderIcon> */}




                    </FlexGridColumn>
                    <Grid.Column width={8}>
                        <motion.div style={{ height: "100px", display: "flex" }}>
                            <HeaderLogoText>Beauhaus Dashboard</HeaderLogoText>
                            {/* <HeaderImage height={`${height}px`} src={Logo}></HeaderImage> */}
                        </motion.div>

                    </Grid.Column>
                    <Grid.Column style={{ display: "flex" }} width={4}>
                        <Button style={{ margin: "auto" }} onClick={() => logout({ returnTo: window.location.origin })}>Log out</Button>
                    </Grid.Column>
                </Grid.Row>

            </Grid>




        </HeaderDiv>
    );
};

export default DashboardHeader