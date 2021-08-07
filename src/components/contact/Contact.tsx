import { motion } from 'framer-motion';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Button, Segment, Container, Grid, Image, Icon, Visibility, VisibilityEventData, Form, TextArea, Input } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectContactPixelsPassed } from '../../redux/slices/navigationSlice';

import Antiques from "../../assets/Antiques_home.jpg"

import useResizeObserver from "@react-hook/resize-observer";
// @ts-ignore
import mapboxgl, { Map } from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

import SmallLogoCircle from "../../assets/Small Logo 3.png"

interface Props {

}

const ContactGridRow = styled(Grid.Row)`
padding-bottom: 0px !important;
padding-top: 0px !important;
`

const ContactLeftPanelDiv = styled.div`
width: 80%;
display: flex;
flex-direction: column;
margin-left: auto;
margin-right: 1rem;
padding: 1rem;
`

const ContactDetailsDiv = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 2rem;
`

const ContactTextContainerDiv = styled.div`
display: flex;
flex-direction: column;
`
const ContactDetailsHeading = styled.h1`
display: flex;
color: white;
margin-bottom: 0.5rem;
margin-left: 1rem;
margin-right: auto;
font-family: "Montserrat", sans-serif;
font-size: 1.3rem;
font-weight: 500;
text-shadow: 1px 1px 1px black;

`
const ContactDetailsSubHeading = styled.div`
display: flex;
color: white;
margin-bottom: 0.5rem;
margin-left: 1rem;
margin-right: auto;
font-family: "Montserrat", sans-serif;
/* font-size: 1.3rem; */
font-weight: 500;
text-align: left;
`


const ContactHeadingTextDiv = styled.h1`
margin-left: auto;
margin-right: auto;
margin-top: 2em !important;
margin-bottom: 1em !important;
font-family: "cinzel";
font-size: 36px;
color: #ccaa66;
text-shadow: 1px 1px 1px black;
/* color: #084b6d; */
/* text-shadow: 1px 1px 1px #eadede; */

`


const ContactButton = styled(Button)`
margin-left: auto !important;
margin-right: auto !important;
margin-top: 0px;
margin-bottom: auto !important;
&&&& {
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
}

font-family: sans-serif;
font-size: 16px;
color: white  !important;
/* color: #084b6d  !important; */
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: 2px  !important;
border-color: #a29064  !important;
/* border-color: #084b6d  !important; */
background-color: transparent  !important;
-webkit-transition: color 200ms ease, background-color 200ms ease  !important;
transition: color 200ms ease, background-color 200ms ease  !important;
border-radius: 0 !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
&:hover {

color: white !important;
background-color: #a29064 !important;
border-color: #a29064 !important;
box-shadow: -1px 1px 1px 2px #0000001f !important;
/* color: white !important;
background-color: #084b6d !important;
border-color: #084b6d !important;
box-shadow: 0px 0px 2px 2px #0000001f !important; */
  }
`

const FormLabel = styled.label`
 &&&& {
display: flex;
color: white;
margin-bottom: 0.5rem;
margin-left: 1rem;
margin-right: auto;
font-family: "Montserrat", sans-serif;
font-size: 1.3rem;
font-weight: 500;
text-shadow: 1px 1px 1px black;
}
`

const FormInput = styled.input`
&&&& {
    border: 2px solid rgba(34,36,38,.15);
}
&&&&:focus {
    border-color: #78bbe9;
}
`

const FormTextArea = styled(TextArea)`
&&&& {
    border: 2px solid rgba(34,36,38,.15);
    min-height: 200px;
    margin-bottom: 2rem;
}
&&&&:focus {
    border-color: #78bbe9;
}
`

const StyledIcon = styled(Icon)`
&&&&& {
    /* border: 2px solid rgba(34,36,38,.15);
    min-height: 100px;
    margin-bottom: 2rem; */
    background-color: #ccaa66 !important;
}

`

const MapContainer = styled.div`
display: flex;
height: 30vh;
width: 100%;
margin: auto;
box-shadow: rgb(0 0 0 / 24%) 1px 1px 3px 2px;
`

const MapMarker = styled(motion.img)`
height: 500px;
`


export const Contact: React.FunctionComponent<Props> = ({ }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    const dispatch = useAppDispatch()

    const panelVariants = {
        hidden: { x: "0px" },
        visible: { x: "260px" },
    }


    const contactRef = React.useRef<HTMLDivElement>(null)

    useResizeObserver(contactRef, (entry) => {
        dispatch(navigationSlice.actions.setContactHeight(entry.contentRect.height))
    });

    const contactPixelsPassed = useAppSelector(selectContactPixelsPassed)

    const EBLogoMarker = () => {

        const smallLogoVariants = {
            hidden: { opacity: 0, y: "20%", scale: 0.15 },
            visible: { opacity: 1, y: "0%", scale: 0.15 },
        }
        return (
            <MapMarker
                animate={{ scale: 0.15, opacity: 1, y: 0 }}
                transition={{ duration: 1 }} style={{ opacity: 0, scale: 0.15, y: "-20%" }} /* className={classes.smallLogo} */ src={SmallLogoCircle}></MapMarker>
        )
    }

    const markerNode = document.createElement('div');

    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`

    const map = React.useRef<any>(null);
    const mapContainer = React.useRef<any>(null);
    const marker = React.useRef<any>(null);

    React.useEffect(() => {
        if (mapContainer.current) {
            map.current = new Map({
                container: mapContainer.current,
                center: [ -1.5862674555619845,52.28327425698424 ],
               
                zoom: 15,
                style: 'mapbox://styles/mapbox/navigation-night-v1',
            })
        }
    }, [])

    const [contactInView, setContactInView] = React.useState(false)

    React.useEffect(()=> {
if(contactPixelsPassed >= 300) {
    setContactInView(true)
} else setContactInView(false)

    },[contactPixelsPassed])

    React.useEffect(() => {
        if (marker.current)
            marker.current.remove()
        if (contactInView)
            marker.current = new mapboxgl.Marker(markerNode).setLngLat([-1.5862674555619845,52.28327425698424]).addTo(map.current)
        ReactDOM.render(EBLogoMarker(), markerNode);

    }, [contactInView])


    return (

        <motion.div
            ref={contactRef}
            animate={showSidebar ? "visible" : "hidden"}
            variants={panelVariants}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: "-2px -2px 3px 2px #0000003d" }}
        >
            <Grid stackable style={{ marginTop: 0, marginBottom: 0, /* backgroundColor: "#334a60" */ backgroundColor: "#334a60" }}>

                <ContactGridRow>
                    <ContactHeadingTextDiv>
                        Contact Us:
                    </ContactHeadingTextDiv>
                </ContactGridRow>

                <ContactGridRow style={{marginBottom: "3rem"}} >
                    <Grid.Column style={{display: "flex"}} width={6}>
                        <ContactLeftPanelDiv>
                            <ContactDetailsDiv>
                                <StyledIcon size="big" circular inverted name='map marker alternate' />
                                <ContactTextContainerDiv>
                                    <ContactDetailsHeading>Location:</ContactDetailsHeading>
                                    <ContactDetailsSubHeading>36 Chapel Street, Warwick, CV344HL</ContactDetailsSubHeading>
                                </ContactTextContainerDiv>
                            </ContactDetailsDiv>
                            <ContactDetailsDiv>
                                <StyledIcon size="big" circular inverted name='mail' />
                                <ContactTextContainerDiv>
                                    <ContactDetailsHeading>Email:</ContactDetailsHeading>
                                    <ContactDetailsSubHeading><a /* className={classes.link} */ href="mailto:info@beauhaus.uk" target="_blank" rel="noopener noreferrer">info@beauhaus.uk</a></ContactDetailsSubHeading>
                                </ContactTextContainerDiv>
                            </ContactDetailsDiv>
                            <ContactDetailsDiv>
                                <StyledIcon size="big" circular inverted name='phone' />
                                <ContactTextContainerDiv>
                                    <ContactDetailsHeading>Phone:</ContactDetailsHeading>
                                    <ContactDetailsSubHeading><a /* className={classes.link} */ href="tel:07974 071651">07974 071651</a></ContactDetailsSubHeading>
                                </ContactTextContainerDiv>
                            </ContactDetailsDiv>
                            <MapContainer ref={mapContainer}>

                            </MapContainer>
                        </ContactLeftPanelDiv>
                    </Grid.Column>
                    <Grid.Column style={{ display: "flex" }} width={10}>
                        <Form size='large' style={{ backgroundColor: "#334a60", padding: "1rem", width: "80%", marginLeft: "1rem", marginRight: "auto" }}>
                            <Form.Group widths='equal'>

                                <Form.Input fluid icon='user' iconPosition='left' input={<FormInput></FormInput>} label={<FormLabel>Name</FormLabel>} placeholder='Name' />
                                <Form.Input fluid icon='mail' iconPosition='left' input={<FormInput></FormInput>} label={<FormLabel>Email</FormLabel>} placeholder='Email' />
                            </Form.Group>
                            <Form.Input fluid icon='bullhorn' iconPosition='left' input={<FormInput></FormInput>} label={<FormLabel>Subject</FormLabel>} placeholder='Subject' />
                            <FormLabel >Message</FormLabel>
                            <FormTextArea label="test" placeholder='Tell us more' />
                            <ContactButton >
                                Submit
                            </ContactButton>

                        </Form>

                    </Grid.Column>
                </ContactGridRow>
            </Grid>
        </motion.div>



    );
};

export default Contact