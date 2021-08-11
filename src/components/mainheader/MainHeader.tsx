import * as React from 'react';
import { Container, Image, Icon, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform,
    useCycle,
    useMotionValue,
} from "framer-motion";
import Logo from "../../assets/Logo 3.png"

import MenuToggle from "./MenuToggle"

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
    /* transform: unset; */
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

export const Header: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const scrollY = useAppSelector((state) => state.navigation.scrollY)

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }

    const headerRef = React.createRef<HTMLDivElement>()

    const dispatch = useAppDispatch()

    React.useEffect(() => {

        if (headerRef.current)

            dispatch(navigationSlice.actions.setHeaderHeight(headerRef.current?.getBoundingClientRect().height))

    }, [])

    const x = useMotionValue(0);
    const xInput = [0, 200];
    const heightRange = [125, 100]

    const height = useTransform(x, xInput, heightRange)

    React.useEffect(() => {
        x.set(scrollY)
    }, [scrollY])

    return (
        <HeaderDiv
            ref={headerRef}
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
                        <motion.div style={{height }}>
                            <HeaderImage height={`${height}px`} src={Logo}></HeaderImage>
                        </motion.div>

                    </Grid.Column>
                    <Grid.Column width={4}>

                    </Grid.Column>
                </Grid.Row>

            </Grid>




        </HeaderDiv>
    );
};

export default Header