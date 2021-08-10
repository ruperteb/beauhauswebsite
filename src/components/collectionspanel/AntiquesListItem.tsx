import * as React from 'react';
import { Query, Item } from "../../schematypes/schematypes"

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

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
  border: 1px solid #00000066;
  box-shadow: rgb(0 0 0 / 24%) 1px 1px 3px 2px;
  transform: perspective(1px) translateZ(0);
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 10px 10px -10px rgb(0 0 0 / 50%);
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }


`

const CardHeading = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  /* width: 100%; */
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  /* font-family: "cinzel"; */
  font-family: 'Mulish', sans-serif;
  font-size: 36px;
  /* color: #ccaa66;
  text-shadow: 1px 1px 1px black; */
  color: #084b6d;
  text-shadow: 1px 1px 1px #eadede;

`

const ImageContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  transition: .5s ease;
  backface-visibility: hidden;
  &:hover {
    opacity: 0.5;
  }
  
 /*  border: 1px solid black; */
`



interface Props {
  antique: Item
  key: any
}

export const AntiquesListItem: React.FunctionComponent<Props> = ({ antique }) => {

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME
    }
  });

  const myImage = cld.image("IMG_20210417_131513888_HDR_zp0lob");

  myImage.resize(fill().width(365).height(261)).delivery(format(auto()))
    .delivery(quality(qAuto()));


  return (
    <Card>
      

      <ImageContainer>
        <AdvancedImage style={{borderRadius: "5px"}} cldImg={myImage} plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />
      </ImageContainer>

      <CardHeading>{antique.name}</CardHeading>


    </Card>

  );
};

export default AntiquesListItem