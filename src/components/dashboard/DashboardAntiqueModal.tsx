
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

import DashboardUpdateAntiqueModal from './DashboardUpdateAntiqueModal';

import { useMutation } from '@apollo/client';
import { UPDATE_IMAGES } from "../../gql/gql"
import { Mutation, MutationUpdateImagesArgs } from "../../schematypes/schematypes"




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

const EditButton = styled(Button)`

&&&& {
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
margin-left: auto !important;
margin-right: 0px !important;
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

const StyledImageTextDiv = styled.div`
    position: absolute;
    z-index:500;
    margin-top: 1rem;
    height: fit-content;
    width: fit-content;
    background-color: #ffffff9e;
    left: 40%;
    `

const StyledImageText = styled.h1`
font-family: 'Mulish', sans-serif;
padding-left: 1rem;
padding-right: 1rem;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
/* font-size: 1rem; */
`

const StyledDropdown = styled(Dropdown)`
&&&&& {position: absolute;
    z-index:1000;
    margin-top: 1rem;
    right: 1rem;
    min-width: fit-content;
    }
`

const DeleteButton = styled(Button)`

&&&& {
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
}

font-family: sans-serif;
font-size: 16px;
/* color: white  !important; */
color: #db3030 !important;
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: 2px  !important;
/* border-color: #a29064  !important; */
border-color: #db3030 !important;
background-color: #eae1e1ab !important;
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
background-color: #db3030 !important;
border-color: #db3030 !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
  }
`

const ButtonContainer = styled.div`

&&&& {
position: absolute;
    z-index: 500;
    margin-top: 5rem;
    right: 1rem;
}
`

const PopupContentContainer = styled.div`
display: flex;
    flex-wrap: wrap;
    flex-direction: row;

`

const ContentButtonContainer = styled.div`
display: flex;
margin-top: auto;

`




export const DashboardAntiqueModal: React.FunctionComponent<Props> = ({ }) => {

    const showAntiqueModal = useAppSelector((state) => state.dashboard.showAntiqueModal)
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
        if (selectedAntique?.length || selectedAntique?.width || selectedAntique?.height) {
            return true
        } else return false
    }


    const cloudName = process.env.REACT_APP_CLOUD_NAME; // replace with your own cloud name
    const uploadPreset = "lhwbdmmk"; // replace with your own upload preset



    var tempImageArray: string[] = []



    const showUploadWidget = () => {
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
                    /* handleUploadImages(result.info.public_id) */
                    tempImageArray.push(result.info.public_id)

                    /* setTempImages(tempImages => [...tempImages, result.info.public_id]) */




                }

                if (result.event === "close") {
                    dispatchImages()
                    /*  console.log(selectedAntique!.images, tempImages) */
                }
            }
        );

        myWidget.open()

    }

    const [updateItem, { data, loading, error }] = useMutation<Mutation, MutationUpdateImagesArgs>(
        UPDATE_IMAGES
    );

    const dispatchImages = () => {
        dispatch(dashboardSlice.actions.setSelectedAntique({ ...selectedAntique!, images: [...selectedAntique!.images, ...tempImageArray] }))
        updateItem({
            variables: {
                _id: selectedAntique?._id!,
                images: [...selectedAntique!.images, ...tempImageArray]
            }

        })
        tempImageArray = []
    }

    const galleryRef = React.useRef(null)



    interface Dropdown {
        key: number
        text: string | undefined
        value: string | number | boolean | (string | number | boolean)[] | undefined

    }

    const [dropdownState, setDropdownState] = React.useState<Dropdown>()

    const dropdownOptions = [
        { key: 1, text: 'Primary', value: "primary" },
        { key: 2, text: 'Secondary', value: "secondary" },
        { key: 3, text: 'Tertiary', value: "tertiary" }

    ]


    const handleDropdownSelect = (e: any, data: any) => {

        setDropdownState({ key: data.key, text: data.text, value: data.value })

        let imagesArray = selectedAntique?.images

        // @ts-ignore: Unreachable code error
        var selectedImage = imagesArray?.[galleryRef.current?.getCurrentIndex()]
        let key = 0
        switch (data.value) {
            case "primary":
                key = 1
                break;
            case "secondary":
                key = 2
                break;
            case "tertiary":
                key = 3
                break;
            default:
                key = 1
        }
        var rest = imagesArray?.filter(image => {
            return image !== selectedImage
        })

        var beforeSelectedImage = rest?.slice(0, key - 1)

        var afterSelectedImage = rest?.slice(key - 1)

        imagesArray = [...beforeSelectedImage!, selectedImage!, ...afterSelectedImage!]
        updateItem({
            variables: {
                _id: selectedAntique?._id!,
                images: imagesArray
            }

        })
        dispatch(dashboardSlice.actions.setSelectedAntique({ ...selectedAntique!, images: imagesArray }))

    }

    const handleDelete = (e: any, data: any) => {


        let imagesArray = selectedAntique?.images

        // @ts-ignore: Unreachable code error
        var selectedImage = imagesArray?.[galleryRef.current?.getCurrentIndex()]

        var rest = imagesArray?.filter(image => {
            return image !== selectedImage
        })



        imagesArray = rest
        updateItem({
            variables: {
                _id: selectedAntique?._id!,
                images: imagesArray!
            }

        })
        dispatch(dashboardSlice.actions.setSelectedAntique({ ...selectedAntique!, images: imagesArray! }))

    }

    const buttonRef = React.useRef(null)
    const [deleteButtonOpen, setDeleteButtonOpen] = React.useState(false)

    const galleryOverlay = () => {
        return (
            <>
                <StyledImageTextDiv>
                    <StyledImageText>
                        Image {
                            // @ts-ignore: Unreachable code error
                            galleryRef.current?.getCurrentIndex() !== undefined ?
                                // @ts-ignore: Unreachable code error
                                galleryRef.current?.getCurrentIndex() + 1 : "loading"}
                    </StyledImageText>

                </StyledImageTextDiv>
                <StyledDropdown
                    /* style={{ minWidth: "0px" }} */

                    /*  name="type" */
                    clearable
                    onChange={handleDropdownSelect}
                    options={dropdownOptions}
                    placeholder='Set Image'
                    selection

                    defaultOpen={false}
                    value={dropdownState?.value}
                />

                <ButtonContainer ref={buttonRef}>
                    <DeleteButton onClick={() => setDeleteButtonOpen(true)}>Delete</DeleteButton>
                    <Popup
                        eventsEnabled={true}
                        on='click'
                        onClose={() => setDeleteButtonOpen(false)}
                        /* style={buttonStyle} */
                        context={buttonRef}
                        position='top center'
                        open={deleteButtonOpen}>
                        <PopupContentContainer style={{ display: "flex" }}>
                            <p style={{ width: "max-content" }}>Are you sure you want to delete this image?</p>
                            <Button style={{ margin: 'auto' }} onClick={handleDelete}>Delete</Button>
                            <Button style={{ margin: 'auto' }} onClick={() => setDeleteButtonOpen(false)}>Cancel</Button>
                        </PopupContentContainer>

                    </Popup>
                </ButtonContainer>



            </>
        )
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
                    <ImageGallery ref={galleryRef}
                        useBrowserFullscreen={false}
                        renderCustomControls={galleryOverlay} showPlayButton={false} items={images!} />
                </GalleryContainer>


                <DescriptionContainer>
                    <DescriptionText style={{ margin: "1rem" }}>{selectedAntique?.description}</DescriptionText>
                    <DimensionsContainer >
                        {checkAllDimensions() ? <DescriptionTextDimensionsSubHeading>Dimensions:</DescriptionTextDimensionsSubHeading> : <div></div>}
                        {selectedAntique?.length !== (null || undefined || 0) ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Length:   ${selectedAntique?.length}cm`}</DescriptionText> : <div></div>}
                        {selectedAntique?.width !== (null || undefined || 0) ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Width:   ${selectedAntique?.width}cm`}</DescriptionText> : <div></div>}
                        {selectedAntique?.height !== (null || undefined || 0) ? <DescriptionText style={{ marginBottom: "0.5rem" }}>{`Height:   ${selectedAntique?.height}cm`}</DescriptionText> : <div></div>}
                    </DimensionsContainer>
                    <DescriptionTextPriceSubHeading>{`Price:  £${selectedAntique?.price}.00`}</DescriptionTextPriceSubHeading>
                    <ContentButtonContainer >
                        <EditButton onClick={() => dispatch(dashboardSlice.actions.setShowUpdateAntiqueModal(true))}>Edit</EditButton>
                        <EnquiryButton onClick={showUploadWidget}>Upload Images</EnquiryButton>
                    </ContentButtonContainer>
                </DescriptionContainer>
            </StyledModalContent>

            <DashboardUpdateAntiqueModal></DashboardUpdateAntiqueModal>

        </StyledModal>


    );
};

export default DashboardAntiqueModal