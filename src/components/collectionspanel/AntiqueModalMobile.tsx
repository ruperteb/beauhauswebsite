
import * as React from 'react';
import { Button, Icon, Modal, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { collectionsSlice } from '../../redux/slices/collectionsSlice';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from "../../gql/gql"
import { Mutation, MutationSendMessageArgs } from "../../schematypes/schematypes"

import { Formik, Form, useField, useFormikContext, FieldHookConfig } from "formik";
import * as Yup from "yup";



interface Props {

}


const EnquiryButton = styled(Button)`

&&&& {
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
margin-left: auto !important;
margin-right: auto !important;
margin-top: auto;
margin-bottom: 1rem !important;
}

font-family: sans-serif;
font-size: 16px;
/* color: white  !important; */
color: #084b6d  !important;
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: 2px  !important;
/* border-color: #a29064  !important; */
border-color: #084b6d  !important;
background-color: transparent  !important;
-webkit-transition: color 200ms ease, background-color 200ms ease  !important;
transition: color 200ms ease, background-color 200ms ease  !important;
border-radius: 0 !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
&:hover {
color: white !important;
/* color: white !important;
background-color: #a29064 !important;
border-color: #a29064 !important;
box-shadow: -1px 1px 1px 2px #0000001f !important; */
background-color: #084b6d !important;
border-color: #084b6d !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
  }
`

const StyledModal = styled(Modal)`
&&&&&&& {
    left: auto !important;
    height: 90%;
    display: flex !important;
    flex-direction: column;
}
`

const StyledModalHeader = styled(Modal.Header)`
&&&&&&& {
    display: flex;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
}
`

const StyledModalHeaderText = styled.p`
&&&&&&& {
    font-family: 'Bodoni Moda', serif;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 400;
    letter-spacing: 2px;
    margin: auto;
    text-align: center;
}
`

const StyledModalHeaderIcon = styled(Icon)`
&&&&&&& {
    margin-top: auto;
    margin-bottom: auto;
    color: #555;
    transform: scale(1);
    transition: opacity 0.2s, color 0.2s, transform 0.2s;
    &:hover {
        transform: scale(1.2);
        color: #000;
    }
}
`

const StyledModalContent = styled(Modal.Content)`
&&&&&&& {
    /* width: 775px; */
    height: fit-content;
    max-height: fit-content;
    display: flex;
    margin: auto;
}
`

const GalleryContainer = styled.div`
    /* width: 70%;
    height: 100%; */
    padding-bottom: 1rem;
`

const DescriptionContainer = styled(Modal.Description)`
   &&&&& {width: 30%;
    /* height: 100%; */
    border: 1px solid #79828a26;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    
    }
`

const DescriptionText = styled.p`
    /* margin-left: 1rem;  */
    font-size: 1.2rem;
    font-family: 'Mulish', sans-serif;
`
const DescriptionTextDimensionsSubHeading = styled.p`
    /* margin-left: 1rem; */ 
    font-family: 'Mulish', sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-align: center;
`

const DimensionsContainer = styled.div`
margin-top: 2rem;
margin-bottom: 2rem;
`

const DescriptionTextPriceSubHeading = styled.p`
    /* margin-left: 1rem;  */
    font-family: 'Mulish', sans-serif;
    text-transform: uppercase;
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 2rem;
    letter-spacing: 2px;
    text-align: center;
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
color: black;
margin-bottom: 0.5rem;
margin-left: 1rem;
margin-right: auto;
font-family: "Montserrat", sans-serif;
font-size: 1.3rem;
font-weight: 500;
/* text-shadow: 1px 1px 1px black; */
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
  bottom: -18.75px;
    }
`

const SubmitButton = styled(Button)`

&&&& {
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
margin-left: auto !important;
margin-right: auto !important;
margin-top: auto;
/* margin-bottom: 1rem !important; */
}

font-family: sans-serif;
font-size: 16px;
/* color: white  !important; */
color: #084b6d  !important;
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: 2px  !important;
/* border-color: #a29064  !important; */
border-color: #084b6d  !important;
background-color: transparent  !important;
-webkit-transition: color 200ms ease, background-color 200ms ease  !important;
transition: color 200ms ease, background-color 200ms ease  !important;
border-radius: 0 !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
&:hover {
color: white !important;
/* color: white !important;
background-color: #a29064 !important;
border-color: #a29064 !important;
box-shadow: -1px 1px 1px 2px #0000001f !important; */
background-color: #084b6d !important;
border-color: #084b6d !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
  }
`




export const AntiqueModalMobile: React.FunctionComponent<Props> = ({ }) => {

    const showAntiqueModal = useAppSelector((state) => state.collections.showAntiqueModal)
    const showAntiqueEnquiryModal = useAppSelector((state) => state.collections.showAntiqueEnquiryModal)
    const selectedAntique = useAppSelector((state) => state.collections.selectedAntique)
    const dispatch = useAppDispatch()

    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.REACT_APP_CLOUD_NAME
        }
    });


    interface Image {
        original: string,
        thumbnail: string,
    }

    var images: Image[] | undefined = []

    if (selectedAntique?.images) {

        images = selectedAntique?.images.map((image) => {

            return {
                original: cld.image(image).resize(fill().width(600).height(400)).delivery(format(auto()))
                    .delivery(quality(qAuto())).toURL(),
                thumbnail: cld.image(image).resize(fill().width(300).height(200)).delivery(format(auto()))
                    .delivery(quality(qAuto())).toURL(),

            }
        })

    }


    /* const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ]; */

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

    const [formState, setFormState] = React.useState<boolean | undefined>(undefined)



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
            <FormInputContainer /* style={props.name === "name" || props.name === "email" ? { width: "50%" } : {}} */>
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

    const checkAllDimensions =() => {
        if (selectedAntique?.length || selectedAntique?.width || selectedAntique?.height) {
            return true
        } else return false
    }

    return (
        <StyledModal
            style={{ left: "auto !!important" }}
            dimmer={"inverted"}
            size={"large"}
            centered
            open={showAntiqueModal}
            onClose={() => dispatch(collectionsSlice.actions.setShowAntiqueModal(false))}
            onOpen={() => dispatch(collectionsSlice.actions.setShowAntiqueModal(true))}
        /* trigger={<Button>Scrolling Content Modal</Button>} */
        >
            <StyledModalHeader>
                <StyledModalHeaderText>
                    {selectedAntique?.name}
                </StyledModalHeaderText>
                <StyledModalHeaderIcon link name='close' onClick={() => dispatch(collectionsSlice.actions.setShowAntiqueModal(false))} />
            </StyledModalHeader>
            <StyledModalContent image scrolling>
                <GalleryContainer>
                    <ImageGallery useBrowserFullscreen={false} showPlayButton={false} items={images!} />
                </GalleryContainer>


                <DescriptionContainer>
                    <DescriptionText style={{ margin: "1rem" }}>{selectedAntique?.description}</DescriptionText>
                    <DimensionsContainer >
                        {checkAllDimensions() ? <DescriptionTextDimensionsSubHeading>Dimensions:</DescriptionTextDimensionsSubHeading>: <div></div>}
                        {selectedAntique?.length !== (null || undefined || 0) ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Length:   ${selectedAntique?.length}cm`}</DescriptionText>: <div></div>}
                        {selectedAntique?.length !== (null || undefined || 0) ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Width:   ${selectedAntique?.width}cm`}</DescriptionText>: <div></div>}
                        {selectedAntique?.length !== (null || undefined || 0) ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Height:   ${selectedAntique?.height}cm`}</DescriptionText>: <div></div>}
                    </DimensionsContainer>
                    <DescriptionTextPriceSubHeading>{`Price:  £${selectedAntique?.price}.00`}</DescriptionTextPriceSubHeading>
                    <EnquiryButton onClick={() => dispatch(collectionsSlice.actions.setShowAntiqueEnquiryModal(true))}>Enquire</EnquiryButton>

                </DescriptionContainer>
            </StyledModalContent>

            <Modal
                onClose={() => dispatch(collectionsSlice.actions.setShowAntiqueEnquiryModal(false))}
                open={showAntiqueEnquiryModal}
                size='small'
            >
                <StyledModalHeader>
                    <StyledModalHeaderText style={{fontSize: "1.2rem"}}>
                        {`Enquiry: ${selectedAntique?.name}`}
                    </StyledModalHeaderText>
                    <StyledModalHeaderIcon link name='close' onClick={() => dispatch(collectionsSlice.actions.setShowAntiqueEnquiryModal(false))} />
                </StyledModalHeader>
                <Modal.Content>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            subject: `Enquiry: ${selectedAntique?.name}`,
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
                                .max(50, "Must be 50 characters or less")
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
                        <Form style={{ /* backgroundColor: "#334a60", */ /* padding: "1rem", */ /* width: "80%", */ marginLeft: "auto", marginRight: "auto" }}>
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
                                placeholder={`Enquiry: ${selectedAntique?.name}`}
                            />

                            <MessageInput
                                label="Message"
                                name="message"
                                type="text"
                                placeholder="Message"
                            />
                            <div ref={buttonRef} style={{ display: "flex" }}>
                                <SubmitButton type="submit" /* onClick={handleSubmit} */ >
                                    Submit
                                </SubmitButton>
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
                </Modal.Content>
            </Modal>
        </StyledModal>


    );
};

export default AntiqueModalMobile