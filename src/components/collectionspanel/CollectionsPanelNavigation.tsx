import React, { CSSProperties } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    withRouter

} from "react-router-dom";

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { Container, Grid, Icon, Search, SearchProps } from 'semantic-ui-react'

import _ from 'lodash'

import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

const FlexGridColumn = styled(Grid.Column)`
    display: flex !important;
    `

const NavLinkDivContainer = styled.div`
    display: flex;
    /* margin: auto; */
    width: 100%;
`

const NavLinkDiv = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 40, */
    width: fit-content;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
    margin: auto;
    line-height: 20;
`
const NavLink = styled(Link)`
    font-family: ${props => props.theme.primaryTextFont};
    text-decoration: none;
    /* font-weight: 100; */
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    color: #404040;
    line-height: 25px;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
    &&&&&&:hover { 
        color: #ffffff;
        text-shadow: 1px 1px 1px #423333ad;
    };
    margin-top: auto;
`

const NavLinkUnderline = styled(motion.div)`
    height: 2px;
    margin-bottom: auto;
`

const StyledBackIcon = styled(Icon)`
   &&&&&& {
    color: black !important; 
    background-color: transparent !important;
    transition: all 0.3s ease;
    cursor: pointer;
    margin-top: auto;
    margin-bottom: auto;
    margin: auto;
   } 
   &&&&&&:hover {
    color: white !important; 
    /* background-color: #fff!important; */
    transform: scale(1.2);
    
   }
`

const StyledContainer = styled(Container)`
    &&&&& {
        background-color: ${props => props.theme.primaryColor};
        height: fit-content; 
        box-shadow: -1px 1px 3px 1px #00000057;
}
`

const StyledGrid = styled(Grid)`
    &&&&& {
    margin: 0; 
}
`


interface Props {
    /* exampleProp: string | undefined, */
}

export const CollectionsPanelNavigation: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const typeFilter = useAppSelector((state) => state.collections.typeFilter)
    /* const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL) */


    const dispatch = useAppDispatch()

    const [navLinkToggle1, setNavLinkToggle1] = React.useState(false)
    const [navLinkToggle2, setNavLinkToggle2] = React.useState(false)
    const [navLinkToggle3, setNavLinkToggle3] = React.useState(false)
    const [navLinkToggle4, setNavLinkToggle4] = React.useState(false)
    const [navLinkToggle5, setNavLinkToggle5] = React.useState(false)

    const [navLinkHover1, setNavLinkHover1] = React.useState(false)
    const [navLinkHover2, setNavLinkHover2] = React.useState(false)
    const [navLinkHover3, setNavLinkHover3] = React.useState(false)
    const [navLinkHover4, setNavLinkHover4] = React.useState(false)
    const [navLinkHover5, setNavLinkHover5] = React.useState(false)

    React.useEffect(() => {
        if (typeFilter === "furniture") {
            setNavLinkToggle1(true)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
        }
        if (typeFilter === "art") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(true)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
        }
        if (typeFilter === "lighting") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(true)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
        }
        if (typeFilter === "collectibles") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(true)
            setNavLinkToggle5(false)
        }
        if (typeFilter === "all") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(true)
        }
    }, [typeFilter])

    const navLinkClick = (type: string) => {

        dispatch(collectionsSlice.actions.setTypeFilter(type))
        dispatch(navigationSlice.actions.setCurrentPageURL(`collections/#${type}`))

    }

    const navLinkHoverStyles: CSSProperties = {
        color: "#ffffff",
        textShadow: "1px 1px 1px #423333ad",

    }

    const handleBackClick = () => {

        dispatch(navigationSlice.actions.setCollectionsPanelVisibility(false))
        document.body.style.overflowY = "visible"
    }

    const [search, setSearch] = React.useState<string | undefined>()

    const handleSearchChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
        setSearch(data.value)
        dispatch(collectionsSlice.actions.setSearch(data.value))


    }



    return (
        <StyledContainer fluid >
            <StyledGrid style={{ margin: 0 }}>
                <Grid.Row>
                    <FlexGridColumn width={1}>

                    </FlexGridColumn>
                    <FlexGridColumn width={2}>
                        <StyledBackIcon size='large' name='chevron left' onClick={handleBackClick} />
                    </FlexGridColumn>
                    <FlexGridColumn width={9}>
                        <NavLinkDivContainer>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover1(true)} onMouseLeave={() => setNavLinkHover1(false)}>
                                <NavLink style={typeFilter === "furniture" ? navLinkHoverStyles : {}} to={`/collections/#furniture`} onClick={() => navLinkClick("furniture")}>Furniture</NavLink>
                                <NavLinkUnderline layout transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle1 === true || navLinkHover1 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover2(true)} onMouseLeave={() => setNavLinkHover2(false)}>
                                <NavLink style={typeFilter === "art" ? navLinkHoverStyles : {}} to={`/collections/#art`} onClick={() => navLinkClick("art")}>Art</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle2 === true || navLinkHover2 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover3(true)} onMouseLeave={() => setNavLinkHover3(false)}>
                                <NavLink style={typeFilter === "lighting" ? navLinkHoverStyles : {}} to={`/collections/#lighting`} onClick={() => navLinkClick("lighting")}>Lighting</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle3 === true || navLinkHover3 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover4(true)} onMouseLeave={() => setNavLinkHover4(false)}>
                                <NavLink style={typeFilter === "collectibles" ? navLinkHoverStyles : {}} to={`/collections/#collectibles`} onClick={() => navLinkClick("collectibles")}>Collectibles</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle4 === true || navLinkHover4 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover5(true)} onMouseLeave={() => setNavLinkHover5(false)}>
                                <NavLink style={typeFilter === "all" ? navLinkHoverStyles : {}} to={`/collections/#all`} onClick={() => navLinkClick("all")}>All</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle5 === true || navLinkHover5 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                        </NavLinkDivContainer>

                    </FlexGridColumn>

                    <FlexGridColumn width={2}>
                        <Search
                            style={{ margin: "auto" }}
                            showNoResults={false}
                            input={{ icon: 'search', iconPosition: 'left' }}
                            /* loading={isLoading}
                            onResultSelect={this.handleResultSelect} */
                            onSearchChange={_.debounce(handleSearchChange, 500, {
                                leading: true,
                            })}
                            /* results={results} */
                            value={search}
                        />
                    </FlexGridColumn>
                </Grid.Row>
            </StyledGrid>

        </StyledContainer>
    );
};

export default CollectionsPanelNavigation