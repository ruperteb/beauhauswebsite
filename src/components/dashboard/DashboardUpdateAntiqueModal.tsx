
import * as React from 'react';
import { Button, Icon, Modal, Popup, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { dashboardSlice } from '../../redux/slices/dashboardSlice';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

import { useMutation } from '@apollo/client';
import { UPDATE_ITEM, GET_ITEMS } from "../../gql/gql"
import { Mutation, MutationUpdateItemArgs, Query } from "../../schematypes/schematypes"

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
}
`

const StyledModalHeaderText = styled.p`
&&&&&&& {
    font-family: 'Bodoni Moda', serif;
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: 400;
    letter-spacing: 2px;
    margin: auto;
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
    width: 70%;
    height: 100%;
`

const DescriptionContainer = styled(Modal.Description)`
   &&&&& {width: 30%;
    height: 100%;
    border: 1px solid rgba(34,36,38,.15);
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
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
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
   /*  margin-bottom: 2rem; */
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

const FormErrorDimensions = styled.div`
position: absolute;
    right: 1.5rem;
    bottom: -1.5rem;
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
  border-top: 10px solid transparent;
  border-bottom: 10px solid #ff000070;
  right: 50%;
  top: -20.25px;
    }
    &:after {
    content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid #f3dfdf;
  right: 50%;
  top: -18.75px;
    }
`

const SubmitButton = styled(Button)`

&&&& {
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
margin-left: auto !important;
margin-right: auto !important;
margin-top: 2rem;
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




export const DashboardUpdateAntiqueModal: React.FunctionComponent<Props> = ({ }) => {

    /* const showAntiqueModal = useAppSelector((state) => state.collections.showAntiqueModal) */
    const showUpdateAntiqueModal = useAppSelector((state) => state.dashboard.showUpdateAntiqueModal)
    const selectedAntique = useAppSelector((state) => state.dashboard.selectedAntique)
    const dispatch = useAppDispatch()

    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.REACT_APP_CLOUD_NAME
        }
    });









    const [formState, setFormState] = React.useState<boolean | undefined>(undefined)

    const [updateItem, { data, loading, error }] = useMutation<Mutation, MutationUpdateItemArgs>(
        UPDATE_ITEM,
        {
            onCompleted: (result) => {
                if (result) {
                    setFormState(true)
                }
            },
            onError: () => setFormState(false)
        }
    );

    /* const handleSubmit = () => {

        sendMessage({
            variables: {
                name: formInput.name,
                from: formInput.from,
                subject: formInput.subject,
                text: formInput.text,
            }

        })
    } */

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

    const NameInput = (props: OtherProps & FieldHookConfig<string>) => {

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

    const DescriptionInput = (props: OtherProps & FieldHookConfig<string>) => {

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

    const DimensionsInput = (props: OtherProps & FieldHookConfig<string>) => {

        const [field, meta] = useField(props);
        return (
            <FormInputContainer style={{ width: "25%" }}>
                <FormLabel htmlFor={props.id || props.name}>{`${props.label} (cm)`}</FormLabel>
                <FormInput type={props.type} className="text-input" /* placeholder={props.placeholder} */ {...field} />
                {meta.touched && meta.error ? (

                    <FormErrorDimensions className="error">{meta.error}</FormErrorDimensions>


                ) : null}
            </FormInputContainer>
        );
    };

    const PriceInput = (props: OtherProps & FieldHookConfig<string>) => {

        const [field, meta] = useField(props);
        return (
            <FormInputContainer style={{ width: "25%" }}>
                <FormLabel htmlFor={props.id || props.name}>{`${props.label} (£)`}</FormLabel>
                <FormInput type={props.type} className="text-input" /* placeholder={props.placeholder} */ {...field} />
                {meta.touched && meta.error ? (

                    <FormErrorDimensions className="error">{meta.error}</FormErrorDimensions>


                ) : null}
            </FormInputContainer>
        );
    };

    const typeDropdownOptions = [
        { key: 1, text: 'Furniture', value: "furniture" },
        { key: 2, text: 'Art', value: "art" },
        { key: 3, text: 'Lighting', value: "lighting" },
        { key: 4, text: 'Collectibles', value: "collectibles" },
    ]

    const TypeInput = (props: OtherProps & FieldHookConfig<string>) => {

        const [field, meta] = useField(props);
        return (
            <FormInputContainer style={{ width: "37.5%" }}>
                <FormLabel htmlFor={props.id || props.name}>{props.label}</FormLabel>
                {/*  <FormInput className="text-input"  {...field} /> */}
                <Dropdown
                    style={{ minWidth: "0px" }}
                    {...field}
                    /*  name="type" */
                    onChange={(e, data) => {
                        const event = {
                            target: {
                                name: data.name,
                                value: data.value,
                            },
                        };

                        field.onChange(event); 
                       
                    }}
                    onBlur={(e, data) => {
                        const event = {
                            target: {
                                name: data.name,
                                value: data.value,
                            },
                        };
                        field.onBlur(event); 
                    }}
                    options={typeDropdownOptions}
                    placeholder='Choose an option'
                    selection
                    
                    defaultOpen={false}
                    value={field.value}
                />
                {meta.touched && meta.error ? (

                    <FormError className="error">{meta.error}</FormError>


                ) : null}
            </FormInputContainer>
        );
    };

    const PeriodInput = (props: OtherProps & FieldHookConfig<string>) => {

        const [field, meta] = useField(props);
        return (
            <FormInputContainer style={{ width: "37.5%" }}>
                <FormLabel htmlFor={props.id || props.name}>{props.label}</FormLabel>
                <FormInput className="text-input" /* placeholder={props.placeholder} */ {...field} />
                {meta.touched && meta.error ? (

                    <FormErrorDimensions className="error">{meta.error}</FormErrorDimensions>


                ) : null}
            </FormInputContainer>
        );
    };

    const ManufactureDateInput = (props: OtherProps & FieldHookConfig<string>) => {

        const [field, meta] = useField(props);
        return (
            <FormInputContainer style={{ width: "25%" }}>
                <FormLabel htmlFor={props.id || props.name}>{props.label}</FormLabel>
                <FormInput type={props.type} className="text-input" /* placeholder={props.placeholder} */ {...field} />
                {meta.touched && meta.error ? (

                    <FormErrorDimensions className="error">{meta.error}</FormErrorDimensions>


                ) : null}
            </FormInputContainer>
        );
    };



    return (


        <Modal
            onClose={() => dispatch(dashboardSlice.actions.setShowUpdateAntiqueModal(false))}
            open={showUpdateAntiqueModal}
            size='small'
        >
            <StyledModalHeader>
                <StyledModalHeaderText style={{ fontSize: "1.3rem" }}>
                    New Antique
                </StyledModalHeaderText>
                <StyledModalHeaderIcon link name='close' onClick={() => dispatch(dashboardSlice.actions.setShowUpdateAntiqueModal(false))} />
            </StyledModalHeader>
            <Modal.Content>
                <Formik
                    initialValues={{
                        name: selectedAntique?.name,
                        description: selectedAntique?.description,
                        length: selectedAntique?.length,
                        width: selectedAntique?.width,
                        height: selectedAntique?.height,
                        price: selectedAntique?.price,
                        type: selectedAntique?.type,
                        period: selectedAntique?.period,
                        date: selectedAntique?.manufactureDate,

                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .max(25, "Must be 25 characters or less")
                            .required("Required"),
                        length: Yup.number()
                            .typeError('Number required')
                            .positive("Positive Value required"),
                           
                        width: Yup.number()
                            .typeError('Number required')
                            .positive("Positive Value required"),
                            
                        height: Yup.number()
                            .typeError('Number required')
                            .positive("Positive Value required"),
                            
                        price: Yup.number()
                            .typeError('Number required')
                            .positive("Positive value required")
                            .required("Required"),
                        description: Yup.string()
                            .max(400, "Must be 400 characters or less")
                            .required("Required"),
                        type: Yup.string()
                            .required("Required"),
                        period: Yup.string()
                            .max(25, "Must be 25 characters or less"),
                        date: Yup.number()
                            .typeError('Number required')
                            .positive("Positive value required")
                            

                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        /* await new Promise(r => setTimeout(r, 500)); */
                        updateItem({
                            variables: {
                                _id: selectedAntique?._id!,
                                name: values.name!,
                                description: values.description!,
                                length: values.length!,
                                height: values.height!,
                                width: values.width!,
                                price: values.price!,
                                type: values.type!,
                                period: values.period!,
                                manufactureDate: values.date!,
                                active: false,

                            },
                            update(cache, { data }) {

                                if (!data) {
                                    return null;
                                }
                
                                const getExistingItems = cache.readQuery<Query>({ query: GET_ITEMS });
                                // Add the new todo to the cache
                                const existingItems = getExistingItems? getExistingItems.itemList : [];
                                const newItem = data.updateItem!/* .returning[0] */;
                                if (existingItems)
                                    cache.writeQuery<Query>({
                                        query: GET_ITEMS,
                                        data: { itemList: [newItem, ...existingItems] }
                                    });
                            }

                        })
                        setSubmitting(false);
                        dispatch(dashboardSlice.actions.setSelectedAntique({
                            _id: selectedAntique!._id, 
                            name: values.name!,
                            description: values.description!,
                            length: values.length!,
                            height: values.height!,
                            width: values.width!,
                            price: values.price!,
                            type: values.type!,
                            period: values.period!,
                            manufactureDate: values.date!,
                            active: false,
                            images: selectedAntique!.images, 
                        }))

                    }}
                >
                    <Form style={{ /* backgroundColor: "#334a60", */ padding: "1rem", /* width: "80%", */ marginLeft: "auto", marginRight: "auto" }}>
                        <StyledFormGroup>

                            <NameInput
                                label="Name"
                                name="name"
                                type="text"
                            /* placeholder="Name" */
                            />

                        </StyledFormGroup>
                        <DescriptionInput
                            label="Description"
                            name="description"
                            type="text"
                        /* placeholder="Message" */
                        />
                        <StyledFormGroup>
                            <DimensionsInput
                                label="Length"
                                name="length"
                                type="number"
                            /*  placeholder={`Enquiry: ${selectedAntique?.name}`} */
                            />
                            <DimensionsInput
                                label="Width"
                                name="width"
                                type="number"
                            /*  placeholder={`Enquiry: ${selectedAntique?.name}`} */
                            />
                            <DimensionsInput
                                label="Height"
                                name="height"
                                type="number"
                            /*  placeholder={`Enquiry: ${selectedAntique?.name}`} */
                            />
                            <PriceInput
                                label="Price"
                                name="price"
                                type="number"
                            /*  placeholder={`Enquiry: ${selectedAntique?.name}`} */
                            />
                        </StyledFormGroup>
                        <StyledFormGroup>

                            <TypeInput
                                label="Type"
                                name="type"
                                type="string"
                            /* placeholder="Name" */
                            />
                            <PeriodInput
                                label="Period"
                                name="period"
                                type="string"
                            /* placeholder="Name" */
                            />
                            <ManufactureDateInput
                                label="Year"
                                name="date"
                                type="number"
                            /* placeholder="Name" */
                            />

                        </StyledFormGroup>


                        <div ref={buttonRef} style={{ display: "flex" }}>
                            <SubmitButton type="submit" /* onClick={handleSubmit} */ >
                                Save
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



    );
};

export default DashboardUpdateAntiqueModal