import { motion } from 'framer-motion';
import * as React from 'react';
import { Button, Segment, Container, Grid, Image, Icon, Modal } from 'semantic-ui-react'
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
import AntiquesList from './AntiquesList';
import { original } from '@reduxjs/toolkit';



interface Props {

}

const HomeImage = styled(Image)`
    /* height: 150px; */
    margin-left: auto;
    margin-right: auto;
    min-height: 500px;
   /*  position: relative;
    z-index: -1; */
  `
const HomeGridRow = styled(Grid.Row)`
padding-bottom: 0px !important;
padding-top: 0px !important;
`

const HomeTextDiv = styled.div`
display: flex;
flex-direction: column;
`
const HomeHeadingTextDiv = styled.h1`
margin-left: 10%;
margin-right: 10%;
margin-top: auto !important;
margin-bottom: 60px;
font-family: "cinzel";
font-size: 36px;
/* color: #ccaa66; */
color: #084b6d;
/* text-shadow: 1px 1px 1px black; */
text-shadow: 1px 1px 1px #eadede;

`

const HomeSubHeadingTextDiv = styled.div`
margin-left: 20%;
margin-right: 20%;
margin-top: 0px;
margin-bottom: 60px;
font-family: sans-serif;
font-size: 16px;
/* color: white; */
color: #084b6d;
`

const HomeButton = styled(Button)`
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
}
`

const StyledModalContent = styled(Modal.Content)`
&&&&&&& {
    /* width: 775px; */
    height: fit-content;
    max-height: fit-content;
}
`

const GalleryContainer = styled.div`
    width: 70%;
    height: 100%;
`

const DescriptionContainer = styled(Modal.Description)`
    width: 30%;
    height: 100%;
`

const DescriptionText = styled.p`
    margin-left: 1rem;  
`


export const AntiqueModal: React.FunctionComponent<Props> = ({ }) => {

    const showAntiqueModal = useAppSelector((state) => state.collections.showAntiqueModal)
    const selectedAntique = useAppSelector((state) => state.collections.selectedAntique)
    const dispatch = useAppDispatch()

    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.REACT_APP_CLOUD_NAME
        }
    });

    /* const myImage = cld.image(antique.images[0]); */

    /* myImage.resize(fill().width(365).height(261)).delivery(format(auto()))
        .delivery(quality(qAuto())); */

    interface Image {
        original: string,
        thumbnail: string,
    }

    /* var images: Image[] = [] */

    var images = selectedAntique?.images.map((image) => {
        return {
            original: cld.image(image).resize(fill().width(600).height(400)).delivery(format(auto()))
                .delivery(quality(qAuto())).toURL(),
            thumbnail: cld.image(image).resize(fill().width(300).height(200)).delivery(format(auto()))
                .delivery(quality(qAuto())).toURL(),

        }
    })


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
            <Modal.Header>{selectedAntique?.name}</Modal.Header>
            <StyledModalContent image scrolling>
                <GalleryContainer>
                    <ImageGallery items={images!} />
                </GalleryContainer>


                <DescriptionContainer>
                    <DescriptionText>{selectedAntique?.description}</DescriptionText>
                    <DescriptionText>{selectedAntique?.height}</DescriptionText>
                    <DescriptionText>{selectedAntique?.description}</DescriptionText>
                    <DescriptionText>{selectedAntique?.description}</DescriptionText>



                </DescriptionContainer>
            </StyledModalContent>
            {/* <Modal.Actions>
                <Button onClick={() => dispatch(collectionsSlice.actions.setShowAntiqueModal(false))} primary>
                    Proceed <Icon name='chevron right' />
                </Button>
            </Modal.Actions> */}
        </StyledModal>


    );
};

export default AntiqueModal