import { motion } from 'framer-motion';
import * as React from 'react';
import { Button, Segment, Container, Grid, Image, Icon, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { collectionsSlice } from '../../redux/slices/collectionsSlice';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";



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


export const AntiqueModal: React.FunctionComponent<Props> = ({ }) => {

    const showAntiqueModal = useAppSelector((state) => state.collections.showAntiqueModal)
    const selectedAntique = useAppSelector((state) => state.collections.selectedAntique)
    const dispatch = useAppDispatch()


    const images = [
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
    ];



    return (
        <Modal
        style={{left:"auto"}}
            size={"fullscreen"}
            centered
            open={showAntiqueModal}
            onClose={() => dispatch(collectionsSlice.actions.setShowAntiqueModal(false))}
            onOpen={() => dispatch(collectionsSlice.actions.setShowAntiqueModal(true))}
        /* trigger={<Button>Scrolling Content Modal</Button>} */
        >
            <Modal.Header>{selectedAntique?.name}</Modal.Header>
            <Modal.Content image scrolling>

                <ImageGallery items={images} />

                <Modal.Description>




                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => dispatch(collectionsSlice.actions.setShowAntiqueModal(false))} primary>
                    Proceed <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
        </Modal>


    );
};

export default AntiqueModal