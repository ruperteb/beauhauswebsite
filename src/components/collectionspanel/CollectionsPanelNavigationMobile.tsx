import React from 'react';

import {
    /* BrowserRouter as Router,
    Switch,
    Route, */
    Link,
    /* useLocation,
    withRouter */

} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { Container, Grid, Icon, Search, SearchProps, Dropdown } from 'semantic-ui-react'

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

const StyledBackIcon = styled(Icon)`
   &&&&&& {
    color: white !important; 
    background-color: transparent !important;
    transition: all 0.3s ease;
    cursor: pointer;
    margin-top: auto;
    margin-bottom: auto;
    margin: auto;
    text-shadow: 0px 0px 3px #000000c4;
   } 
   &&&&&&:hover {
    color: white !important; 
    /* background-color: #fff!important; */
    transform: scale(1.2);
    
   }
`

const StyledContainer = styled(Container)`
    &&&&&&& {
        background-color: ${props => props.theme.primaryColor};
        height: fit-content; 
        box-shadow: -1px 1px 3px 1px #00000057;
        margin-left :0 !important;
        margin-right :0 !important;
        width: 100% !important;
}
`

const StyledGrid = styled(Grid)`
    &&&&& {
    margin: 0; 
}
`

const StyledDropdown = styled(Dropdown)`
&&&&&&& {
    background-color: #bfd5cb;
    font-size: 1.4em;
border: none;
font-family: 'Bodoni Moda',serif;
/* text-shadow: 1px 1px 1px black; */
color: white;
text-align: center;
display: flex;
padding: 0;
transition: all 0.5s ease-out;
/* padding-right: 2.1rem; */
&:hover {
    text-shadow: none;
    border: none;
    box-shadow: none;
}
.text {
    display:flex !important;
    margin: auto;
    /* margin-left: 0.5rem; */
}
.icon {
    display: flex !important;
    padding: 0;
    margin: auto;
    margin-left: 0;
    margin-right: 0.5rem;
    position: relative;
    top: 0;
    right: 0;
}
}

`



interface Props {
    /* exampleProp: string | undefined, */
}

export const CollectionsPanelNavigationMobile: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const typeFilter = useAppSelector((state) => state.collections.typeFilter)
    /* const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL) */

    let history = useHistory();

    const dispatch = useAppDispatch()

    /* const [navLinkToggle1, setNavLinkToggle1] = React.useState(false)
    const [navLinkToggle2, setNavLinkToggle2] = React.useState(false)
    const [navLinkToggle3, setNavLinkToggle3] = React.useState(false)
    const [navLinkToggle4, setNavLinkToggle4] = React.useState(false)
    const [navLinkToggle5, setNavLinkToggle5] = React.useState(false)
    const [navLinkToggle6, setNavLinkToggle6] = React.useState(false)
    const [navLinkToggle7, setNavLinkToggle7] = React.useState(false)
    const [navLinkToggle8, setNavLinkToggle8] = React.useState(false)
    const [navLinkToggle9, setNavLinkToggle9] = React.useState(false)

    const [navLinkHover1, setNavLinkHover1] = React.useState(false)
    const [navLinkHover2, setNavLinkHover2] = React.useState(false)
    const [navLinkHover3, setNavLinkHover3] = React.useState(false)
    const [navLinkHover4, setNavLinkHover4] = React.useState(false)
    const [navLinkHover5, setNavLinkHover5] = React.useState(false)
    const [navLinkHover6, setNavLinkHover6] = React.useState(false)
    const [navLinkHover7, setNavLinkHover7] = React.useState(false)
    const [navLinkHover8, setNavLinkHover8] = React.useState(false)
    const [navLinkHover9, setNavLinkHover9] = React.useState(false) */

    /* React.useEffect(() => {
        if (typeFilter === "furniture") {
            setNavLinkToggle1(true)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
            setNavLinkToggle6(false)
            setNavLinkToggle7(false)
            setNavLinkToggle8(false)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "art") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(true)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
            setNavLinkToggle6(false)
            setNavLinkToggle7(false)
            setNavLinkToggle8(false)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "lighting") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(true)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
            setNavLinkToggle6(false)
            setNavLinkToggle7(false)
            setNavLinkToggle8(false)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "collectibles") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(true)
            setNavLinkToggle5(false)
            setNavLinkToggle6(false)
            setNavLinkToggle7(false)
            setNavLinkToggle8(false)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "carpets") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(true)
            setNavLinkToggle6(false)
            setNavLinkToggle7(false)
            setNavLinkToggle8(false)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "mirrors") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
            setNavLinkToggle6(true)
            setNavLinkToggle7(false)
            setNavLinkToggle8(false)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "objetdart") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
            setNavLinkToggle6(false)
            setNavLinkToggle7(true)
            setNavLinkToggle8(false)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "misc") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
            setNavLinkToggle6(false)
            setNavLinkToggle7(false)
            setNavLinkToggle8(true)
            setNavLinkToggle9(false)
        }
        if (typeFilter === "all") {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
            setNavLinkToggle4(false)
            setNavLinkToggle5(false)
            setNavLinkToggle6(false)
            setNavLinkToggle7(false)
            setNavLinkToggle8(false)
            setNavLinkToggle9(true)
        }
    }, [typeFilter]) */

    const navLinkClick = (type: string) => {

        dispatch(collectionsSlice.actions.setTypeFilter(type))
        dispatch(navigationSlice.actions.setCurrentPageURL(`collections/#${type}`))
        history.push(`/collections/#${type}`);

    }

    /* const navLinkHoverStyles: CSSProperties = {
        color: "#ffffff",
        textShadow: "1px 1px 1px #423333ad",

    } */

    const handleBackClick = () => {

        dispatch(navigationSlice.actions.setCollectionsPanelVisibility(false))
        document.body.style.overflowY = "visible"
        history.push(`/#collections`);
    }

    const [search, setSearch] = React.useState<string | undefined>()

    const handleSearchChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
        setSearch(data.value)
        dispatch(collectionsSlice.actions.setSearch(data.value))


    }

    const typeDropdownOptions = [
        { key: 1, text: "Furniture", value: "furniture" },
        { key: 2, text: 'Art', value: "art" },
        { key: 3, text: 'Lighting', value: "lighting" },
        { key: 4, text: 'Collectibles', value: "collectibles" },
        { key: 5, text: 'Carpets & Rugs', value: "carpets" },
        { key: 6, text: 'Mirrors', value: "mirrors" },
        { key: 7, text: "Objet d'art", value: "objetdart" },
        { key: 8, text: 'Miscellaneous', value: "misc" },
    ]



    return (
        <StyledContainer fluid >
            <StyledGrid style={{ margin: 0 }}>
                <Grid.Row style={{paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                    {/* <FlexGridColumn width={1}>

                    </FlexGridColumn> */}
                    <FlexGridColumn width={2}>
                        <StyledBackIcon size='large' name='chevron left' onClick={handleBackClick} />
                    </FlexGridColumn>
                    <FlexGridColumn width={7} style={{paddingRight: 0, paddingLeft: 0}}>
                        <NavLinkDivContainer>
                            <StyledDropdown
                                placeholder='Select Type'
                                fluid
                                selection
                                options={typeDropdownOptions}
                                onChange={(e:any, data:any) => {
                                    navLinkClick(String(data.value!)) 
                                }}
                                value={typeFilter}
                            />
                            {/* <NavLinkDiv onMouseEnter={() => setNavLinkHover1(true)} onMouseLeave={() => setNavLinkHover1(false)}>
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
                                <NavLink style={typeFilter === "carpets" ? navLinkHoverStyles : {}} to={`/collections/#carpets`} onClick={() => navLinkClick("carpets")}>Carpets & Rugs</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle5 === true || navLinkHover5 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover6(true)} onMouseLeave={() => setNavLinkHover6(false)}>
                                <NavLink style={typeFilter === "mirrors" ? navLinkHoverStyles : {}} to={`/collections/#mirrors`} onClick={() => navLinkClick("mirrors")}>Mirrors</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle6 === true || navLinkHover6 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover7(true)} onMouseLeave={() => setNavLinkHover7(false)}>
                                <NavLink style={typeFilter === "objetdart" ? navLinkHoverStyles : {}} to={`/collections/#objetdart`} onClick={() => navLinkClick("objetdart")}>Objet d'art</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle7 === true || navLinkHover7 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>
                            <NavLinkDiv onMouseEnter={() => setNavLinkHover8(true)} onMouseLeave={() => setNavLinkHover8(false)}>
                                <NavLink style={typeFilter === "misc" ? navLinkHoverStyles : {}} to={`/collections/#misc`} onClick={() => navLinkClick("misc")}>Misc</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle8 === true || navLinkHover8 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv>

                            <NavLinkDiv onMouseEnter={() => setNavLinkHover9(true)} onMouseLeave={() => setNavLinkHover9(false)}>
                                <NavLink style={typeFilter === "all" ? navLinkHoverStyles : {}} to={`/collections/#all`} onClick={() => navLinkClick("all")}>All</NavLink>
                                <NavLinkUnderline transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle9 === true || navLinkHover9 === true ? { opacity: 1, width: "100%", backgroundColor: "#4daca76b" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></NavLinkUnderline>
                            </NavLinkDiv> */}
                        </NavLinkDivContainer>

                    </FlexGridColumn>

                    <FlexGridColumn width={7}>
                        <Search
                            style={{ margin: "auto", width: "100%" }}
                            showNoResults={false}
                            input={{ icon: 'search', iconPosition: 'left', style: {width: "100%"}  }}
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

export default CollectionsPanelNavigationMobile