
import * as React from 'react';
import { Button, Icon, Modal, Popup } from 'semantic-ui-react'
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

import DashboardUpdateAntiqueModal from './DashboardUpdateAntiqueModal';

import { useMutation } from '@apollo/client';
import { UPDATE_IMAGES, GET_ITEMS } from "../../gql/gql"
import { Mutation, MutationUpdateImagesArgs, Query } from "../../schematypes/schematypes"

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
    min-height: 80%;
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




export const DashboardAntiqueModal: React.FunctionComponent<Props> = ({ }) => {

    const showAntiqueModal = useAppSelector((state) => state.dashboard.showAntiqueModal)
    const showAntiqueEnquiryModal = useAppSelector((state) => state.collections.showAntiqueEnquiryModal)
    const selectedAntique = useAppSelector((state) => state.dashboard.selectedAntique)
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




    const checkAllDimensions = () => {
        if (selectedAntique?.length && selectedAntique.width && selectedAntique.height) {
            return true
        } else return false
    }





    const cloudName = process.env.REACT_APP_CLOUD_NAME; // replace with your own cloud name
    const uploadPreset = "lhwbdmmk"; // replace with your own upload preset
    // @ts-ignore: Unreachable code error
    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,

            // Remove the comments from the code below to add 
            // additional functionality.
            // Note that these are only a few examples, to see 
            // the full list of possible parameters that you 
            // can add see:
            //   https://cloudinary.com/documentation/upload_widget_reference

            // cropping: true, //add a cropping step
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            // sources: [ "local", "url"], // restrict the upload sources to URL and local files
            // multiple: false,  //restrict upload to a single file
            folder: selectedAntique?.name, //upload files to the specified folder
            // tags: ["users", "profile"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", //change to a purple theme
        },
        (error: any, result: any) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info.public_id);
                handleUploadImages(result.info.public_id)

            }
        }
    );

    const showUploadWidget = () => {
        myWidget.open()

    }

    const [updateItem, { data, loading, error }] = useMutation<Mutation, MutationUpdateImagesArgs>(
        UPDATE_IMAGES
    );

    console.log(selectedAntique)

    const handleUploadImages = (image:string) => {
        var tempImages:string[] = []
        if(selectedAntique?.images) {
            tempImages = selectedAntique?.images!.concat(image)
        } else tempImages = tempImages.concat(image)

        dispatch(dashboardSlice.actions.setSelectedAntique({...selectedAntique!, images: tempImages}))
        
        updateItem({
            variables: {
                _id: selectedAntique?._id!,
                images: tempImages!
            }

        })
    }

    return (
        <StyledModal
            style={{ left: "auto !!important" }}
            dimmer={"inverted"}
            size={"large"}
            centered
            open={showAntiqueModal}
            onClose={() => dispatch(dashboardSlice.actions.setShowAntiqueModal(false))}
            onOpen={() => dispatch(dashboardSlice.actions.setShowAntiqueModal(true))}
        /* trigger={<Button>Scrolling Content Modal</Button>} */
        >
            <StyledModalHeader>
                <StyledModalHeaderText>
                    {selectedAntique?.name}
                </StyledModalHeaderText>
                <StyledModalHeaderIcon link name='close' onClick={() => dispatch(dashboardSlice.actions.setShowAntiqueModal(false))} />
            </StyledModalHeader>
            <StyledModalContent image scrolling>
                <GalleryContainer>
                    <ImageGallery showPlayButton={false} items={images!} />
                </GalleryContainer>


                <DescriptionContainer>
                    <DescriptionText style={{ margin: "1rem" }}>{selectedAntique?.description}</DescriptionText>
                    <DimensionsContainer >
                        {checkAllDimensions() ? <DescriptionTextDimensionsSubHeading>Dimensions:</DescriptionTextDimensionsSubHeading> : <div></div>}
                        {selectedAntique?.length !== null ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Length:   ${selectedAntique?.length}cm`}</DescriptionText> : <div></div>}
                        {selectedAntique?.length !== null ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Width:   ${selectedAntique?.width}cm`}</DescriptionText> : <div></div>}
                        {selectedAntique?.length !== null ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Height:   ${selectedAntique?.height}cm`}</DescriptionText> : <div></div>}
                    </DimensionsContainer>
                    <DescriptionTextPriceSubHeading>{`Price:  £${selectedAntique?.price}.00`}</DescriptionTextPriceSubHeading>
                    <EnquiryButton onClick={() => dispatch(dashboardSlice.actions.setShowUpdateAntiqueModal(true))}>Edit</EnquiryButton>
                    <EnquiryButton onClick={showUploadWidget}>Upload Images</EnquiryButton>
                </DescriptionContainer>
            </StyledModalContent>

            <DashboardUpdateAntiqueModal></DashboardUpdateAntiqueModal>

        </StyledModal>


    );
};

export default DashboardAntiqueModal