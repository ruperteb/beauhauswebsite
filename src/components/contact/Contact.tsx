import { motion } from 'framer-motion';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Button, Segment, Container, Grid, Image, Icon, Visibility, VisibilityEventData, /* Form, */ TextArea, Input, Message, Popup, InputOnChangeData } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice, selectContactPixelsPassed } from '../../redux/slices/navigationSlice';

import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from "../../gql/gql"
import { Mutation, MutationSendMessageArgs } from "../../schematypes/schematypes"

import { Formik, Form, useField, useFormikContext, FieldHookConfig } from "formik";
import * as Yup from "yup";


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

const FormInputContainer = styled.div`
width: 100%;
display: flex;
position: relative;
flex-direction: column;
padding: 1rem;
padding-top: 0;
`
const StyledFormGroup = styled.div`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
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
    width: 100%;
    padding: 0.65rem 0.5rem;
  font-size: 1rem;
  border: 2px solid grey;
  /* background-color: var(--gray-100); */
  color: black;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
&&&&:focus {
    /* border-color: #78bbe9; */
    outline: none;
  border: 2px solid #78bbe9;
}
`

const FormTextArea = styled.textarea`
&&&& {
    padding: 0.65rem 0.5rem;
  font-size: 1rem;
  border: 2px solid grey;
  /* background-color: var(--gray-100); */
  color: black;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
    min-height: 200px;
    margin-bottom: 2rem;
}
&&&&:focus {
    outline: none;
    border: 2px solid #78bbe9;
}
`

const FormError = styled.div`
position: absolute;
    right: 1rem;
    top: -0.5rem;
    border: 1px solid #ff000070;
    color: red;
    border-radius: 4px;
    padding: 0.2rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    background-color: #f3dfdf;
    &:before {
    content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #ff000070;
  border-bottom: 10px solid transparent;
  right: 50%;
  bottom: -20.25px;
    }
    &:after {
    content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #f3dfdf;
  border-bottom: 10px solid transparent;
  right: 50%;
  bottom: -18px;
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
                center: [-1.5862674555619845, 52.28327425698424],

                zoom: 15,
                style: 'mapbox://styles/mapbox/navigation-night-v1',
            })
        }
    }, [])

    const [contactInView, setContactInView] = React.useState(false)

    React.useEffect(() => {
        if (contactPixelsPassed >= 300) {
            setContactInView(true)
        } else setContactInView(false)

    }, [contactPixelsPassed])

    React.useEffect(() => {
        if (marker.current)
            marker.current.remove()
        if (contactInView)
            marker.current = new mapboxgl.Marker(markerNode).setLngLat([-1.5862674555619845, 52.28327425698424]).addTo(map.current)
        ReactDOM.render(EBLogoMarker(), markerNode);

    }, [contactInView])

    type FormInput = {
        name: String
        from: String
        subject: String
        text: String
    }

    const [formInput, setFormInput] = React.useState<FormInput>({
        name: "",
        from: "",
        subject: "",
        text: "",
    })

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setFormInput({ ...formInput, name: data.value })
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setFormInput({ ...formInput, from: data.value })
    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setFormInput({ ...formInput, subject: data.value })
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setFormInput({ ...formInput, text: data.value })

    console.log(formInput)

    const [formState, setFormState] = React.useState<boolean | undefined>(undefined)

    console.log(formState)

    const [sendMessage, { data, loading, error }] = useMutation<Mutation, MutationSendMessageArgs>(
        SEND_MESSAGE,
        {
            onCompleted: (result) => {
                if (result) {
                    setFormState(true)
                }
            },
            onError: () => setFormState(false)
        }
    );

    const handleSubmit = () => {

        sendMessage({
            variables: {
                name: formInput.name,
                from: formInput.from,
                subject: formInput.subject,
                text: formInput.text,
            }

        })
    }

    const buttonRef = React.useRef(null)
    const nameRef = React.useRef(null)
    const emailRef = React.useRef(null)
    const subjectRef = React.useRef(null)
    const messageRef = React.useRef(null)

    const buttonStyle = {
        borderRadius: 0,
        /* opacity: 0.7, */
        padding: '2em',
        boxShadow: "0 0 0 1px #a3c293 inset, 0 0 0 0 transparent",
        backgroundColor: "#fcfff5",
        color: "#2c662d",
    }

    interface OtherProps {
        label: string
    }

    const TextInput = (props: OtherProps & FieldHookConfig<string>) => {

        const [field, meta] = useField(props);
        return (
            <FormInputContainer style={props.name === "name" || props.name === "email" ? { width: "50%" } : {}}>
                <FormLabel htmlFor={props.id || props.name}>{props.label}</FormLabel>
                <FormInput className="text-input" /* placeholder={props.placeholder} */ {...field} />
                {meta.touched && meta.error ? (

                    <FormError className="error">{meta.error}</FormError>


                ) : null}
            </FormInputContainer>
        );
    };

    const MessageInput = (props: OtherProps & FieldHookConfig<string>) => {

        const [field, meta] = useField(props);
        return (
            <FormInputContainer>
                <FormLabel htmlFor={props.id || props.name}>{props.label}</FormLabel>
                <FormTextArea  /* placeholder={props.placeholder} */ {...field} />
                {meta.touched && meta.error ? (
                    <FormError className="error">{meta.error}</FormError>
                ) : null}
            </FormInputContainer>
        );
    };

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

                <ContactGridRow style={{ marginBottom: "3rem" }} >
                    <Grid.Column style={{ display: "flex" }} width={6}>
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
                        {/* <Form success={formState === true ? true : false} error={formState === false ? true : false} size='large' style={{ backgroundColor: "#334a60", padding: "1rem", width: "80%", marginLeft: "1rem", marginRight: "auto" }}>
                            <Form.Group widths='equal'>

                                <Form.Input value={formInput.name} onChange={handleNameChange} fluid icon='user' iconPosition='left' input={<FormInput></FormInput>} label={<FormLabel>Name</FormLabel>} placeholder='Name' />

                                <Form.Input value={formInput.from} onChange={handleEmailChange} fluid icon='mail' iconPosition='left' input={<FormInput></FormInput>} label={<FormLabel>Email</FormLabel>} placeholder='Email' />
                            </Form.Group>
                            <Form.Input value={formInput.subject} onChange={handleSubjectChange} fluid icon='bullhorn' iconPosition='left' input={<FormInput></FormInput>} label={<FormLabel>Subject</FormLabel>} placeholder='Subject' />
                            <FormLabel >Message</FormLabel>
                            <FormTextArea value={formInput.text} onChange={handleTextChange} label="test" placeholder='Tell us more' />
                            <div ref={buttonRef}>
                                <ContactButton onClick={handleSubmit} >
                                    Submit
                                </ContactButton>
                            </div>
                            <Popup
                                eventsEnabled={true}
                                on='click'
                                onClose={() => setFormState(false)}
                                style={buttonStyle}
                                context={buttonRef}
                                position='top center'
                                open={formState}>
                                <p style={{ display: "flex", marginBottom: "0.5rem" }}><b style={{ marginLeft: "auto", marginRight: "auto" }}>{formState === true ? "Form Submitted" : "Submission Failed"}</b></p>
                                <p>{formState === true ? "Your message has been sent" : "Please try again"}</p>
                            </Popup>

                        </Form> */}
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                subject: "",
                                message: "",

                            }}
                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .max(25, "Must be 25 characters or less")
                                    .required("Required"),
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("Required"),
                                subject: Yup.string()
                                    .max(30, "Must be 30 characters or less")
                                    .required("Required"),
                                message: Yup.string()
                                    .max(400, "Must be 400 characters or less")
                                    .required("Required"),

                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                /* await new Promise(r => setTimeout(r, 500)); */
                                sendMessage({
                                    variables: {
                                        name: values.name,
                                        from: values.email,
                                        subject: values.subject,
                                        text: values.message,
                                    }

                                })
                                setSubmitting(false);

                            }}
                        >
                            <Form style={{ backgroundColor: "#334a60", padding: "1rem", width: "80%", marginLeft: "1rem", marginRight: "auto" }}>
                                <StyledFormGroup>

                                    <TextInput
                                        label="Name"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                    />


                                    <TextInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                    />

                                </StyledFormGroup>

                                <TextInput
                                    label="Subject"
                                    name="subject"
                                    type="text"
                                    placeholder="Subject"
                                />

                                <MessageInput
                                    label="Message"
                                    name="message"
                                    type="text"
                                    placeholder="Message"
                                />
                                <div ref={buttonRef}>
                                    <ContactButton type="submit" /* onClick={handleSubmit} */ >
                                        Submit
                                    </ContactButton>
                                </div>
                                <Popup
                                    eventsEnabled={true}
                                    on='click'
                                    onClose={() => setFormState(false)}
                                    style={buttonStyle}
                                    context={buttonRef}
                                    position='top center'
                                    open={formState}>
                                    <p style={{ display: "flex", marginBottom: "0.5rem" }}><b style={{ marginLeft: "auto", marginRight: "auto" }}>{formState === true ? "Form Submitted" : "Submission Failed"}</b></p>
                                    <p>{formState === true ? "Your message has been sent" : "Please try again"}</p>
                                </Popup>
                            </Form>
                        </Formik>

                    </Grid.Column>
                </ContactGridRow>
            </Grid>

        </motion.div>



    );
};

export default Contact