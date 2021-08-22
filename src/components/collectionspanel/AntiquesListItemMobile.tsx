import * as React from 'react';
import { CSSProperties } from "react";
import { Query, Item } from "../../schematypes/schematypes"

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { collectionsSlice } from '../../redux/slices/collectionsSlice';

import { Button } from 'semantic-ui-react'

import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1rem; */
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  /* background-color: #e6ece8; */
  /* border: 1px solid #00000066; */
  /* box-shadow: rgb(0 0 0 / 24%) 1px 1px 3px 2px; */
  transform: perspective(1px) translateZ(0);
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
  border-radius: 5px;
  &:hover {
    box-shadow: -2px 2px 5px 1px rgb(0 0 0 / 17%);
    -webkit-transform: scale(1.05);
    transform: scale(1.03);
  }


`

const CardHeading = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  /* width: 100%; */
  margin-top: 1em !important;
  margin-bottom: 0.5em !important;
  /* font-family: "cinzel"; */
  font-family: 'Mulish', sans-serif;
  font-size: 14px;
  /* color: #ccaa66;
  text-shadow: 1px 1px 1px black; */
  /* color: #084b6d; */
  /* text-shadow: 1px 1px 1px #eadede; */
  letter-spacing: .15em;
  line-height: 1.5em;
  text-transform: uppercase;

`
const CardSubHeading = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  /* width: 100%; */
  /* margin-top: 1em !important; */
  margin-bottom: 1em !important;
  /* font-family: "cinzel"; */
  /* font-family: 'Mulish', sans-serif;
  font-size: 16px; */
  /* color: #ccaa66;
  text-shadow: 1px 1px 1px black; */
  /* color: #084b6d; */
  /* text-shadow: 1px 1px 1px #eadede; */
  /* letter-spacing: .15em;
  line-height: 1.5em;
  text-transform: uppercase; */

  /* margin: .6em 0 0 0; */
    color: rgba(34,34,34,.5);
    /* font-family: Helvetica,Arial,sans-serif; */
    font-weight: normal;
    font-size: 13px;
    letter-spacing: 0px;
    font-family: europa;
    font-weight: 400;
    font-style: normal;
    /* font-size: 10px; */
    letter-spacing: .1em;
    line-height: 1.4em;
    text-transform: none;

`

const ImageContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  transition: .5s ease;
  backface-visibility: hidden;
  ${Card}:hover &&&&& {
    opacity: 0.5;
  }
  
 /*  border: 1px solid black; */
`

const ImageButton = styled(Button)`


&&&& {
opacity: 0;
top: 0;
left: 0;
bottom: 0;
right: 0;
height: fit-content;
margin-left: auto !important;
margin-right: auto !important;
margin-top: 30%;
margin-bottom: auto !important;
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
align-items: center; // does vertically center the desired content
justify-content: center; // horizontally centers single line items
position: absolute;
}

font-family: sans-serif;
font-size: 16px;
color: black  !important;
/* color: #084b6d  !important; */
display:flex;
width: fit-content;
border-style: solid  !important;
border-width: 1px  !important;
border-color: black  !important;
/* border-color: #084b6d  !important; */
background-color: #ffffff80   !important;
-webkit-transition: color 200ms ease, background-color 200ms ease  !important;
transition: color 200ms ease, background-color 200ms ease  !important;
border-radius: 0 !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
&:hover {

color: white !important;
background-color: #b8c8bd !important;
border-color: black !important;
box-shadow: 0px 0px 2px 2px #0000001f !important;
/* color: white !important;
background-color: #084b6d !important;
border-color: #084b6d !important;
box-shadow: 0px 0px 2px 2px #0000001f !important; */
  }
  ${Card}:hover &&&&& {
    opacity: 1;
  }
`

const imageStyles: CSSProperties = {
  borderRadius: "5px",
  boxShadow: "0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)",
  /* marginTop: "-1rem",
  marginLeft: "0.5rem",
  marginRight: "0.5rem", */
}

interface Props {
  antique: Item
  key: any
}

export const AntiquesListItemMobile: React.FunctionComponent<Props> = ({ antique }) => {

  const dispatch = useAppDispatch()

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME
    }
  });

  const getItemTypeImage = () => {

    switch (antique.type) {
      case "furniture":
        return "Antiques_furniture_okpb1m"
        break;
      case "art":
        return "Antiques_art_cqy3cl"
        break;
      case "lighting":
        return "Antiques_lighting_dwpoja"
        break;
      case "collectibles":
        return "Antiques_collectibles_skr3yx"
        break;
      default:
        return "Antiques_furniture_okpb1m"
    }
  }

  var myImage = cld.image(getItemTypeImage());

  if (antique.images) {
    myImage = cld.image(antique.images[0]);
  }

  myImage.resize(fill().width(300).height(200)).delivery(format(auto()))
    .delivery(quality(qAuto()));

  const handleClick = () => {
    dispatch(collectionsSlice.actions.setSelectedAntique(antique))
    dispatch(collectionsSlice.actions.setShowAntiqueModal(true))
    window.gtag('event', 'screen_view', { 'screen_name': `Antique: ${antique.name}`});
  }


  return (
    <Card>


      <ImageContainer>
        <AdvancedImage style={imageStyles} cldImg={myImage} plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />

      </ImageContainer>
      <ImageButton onClick={() => handleClick()}>View</ImageButton>

      <CardHeading>{antique.name}</CardHeading>
      <CardSubHeading>£{antique.price}.00</CardSubHeading>


    </Card>

  );
};

export default AntiquesListItemMobile