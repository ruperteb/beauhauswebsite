import * as React from 'react';
import { CSSProperties } from "react";


import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { dashboardSlice } from '../../redux/slices/dashboardSlice';

import { useMutation } from '@apollo/client';
import { TOGGLE_ACTIVE, DELETE_ITEM, GET_ITEMS } from "../../gql/gql"
import { Mutation, MutationToggleActiveArgs, MutationDeleteItemArgs, Query, Item } from "../../schematypes/schematypes"

import { Button, Popup, Checkbox, Loader } from 'semantic-ui-react'

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
  font-size: 16px;
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
/* top: 0;
left: 0;
bottom: 0;
right: 0; */
height: fit-content;
margin-left: auto !important;
margin-right: auto !important;
margin-top: auto;
margin-bottom: 1rem !important;
padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important;
align-items: center; // does vertically center the desired content
justify-content: center; // horizontally centers single line items
/* position: absolute; */
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

const DeleteButton = styled(Button)`

&&&& {
  opacity: 0;
/* padding: 1em !important;
padding-left: 2em !important;
padding-right: 2em !important; */
margin: auto;
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
  ${Card}:hover &&&&& {
    opacity: 1;
  }
`

const ButtonContainer = styled.div`

&&&& {
position: absolute;
display: flex;
flex-wrap: wrap;
    flex-direction: column;
    z-index: 500;
    margin-top: 20%;
    right: 35%;
}
`

const PopupContentContainer = styled.div`
display: flex;
    flex-wrap: wrap;
    flex-direction: row;

`

const CheckboxContainer = styled.div`

&&&& {
position: absolute;
display: flex;
flex-wrap: wrap;
    flex-direction: row;
    z-index: 1000;
    margin-top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    border-radius: 15px;
}
${Card}:hover &&&&& {
    background-color: #ffffff85;
  }
`

const ActiveText = styled.p`
margin: auto;
margin-right: 1rem;
font-size: 1.2rem;
opacity: 0;
${Card}:hover &&&&& {
    
    opacity:1;
  }
`

interface Props {
  antique: Item
  key: any
}

export const DashboardAntiquesListItem: React.FunctionComponent<Props> = ({ antique }) => {

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

  if (antique.images && antique.images[0] !== undefined) {
    myImage = cld.image(antique.images[0]);
  }

  myImage.resize(fill().width(365).height(261)).delivery(format(auto()))
    .delivery(quality(qAuto()));

  const handleClick = () => {
    dispatch(dashboardSlice.actions.setSelectedAntique(antique))
    dispatch(dashboardSlice.actions.setShowAntiqueModal(true))
  }

  const buttonRef = React.useRef(null)
  const [deleteButtonOpen, setDeleteButtonOpen] = React.useState(false)

  const [updateItem, { data: updateItemData, loading: updateItemLoading, error: updateItemError }] = useMutation<Mutation, MutationToggleActiveArgs>(
    TOGGLE_ACTIVE
  );

  const [deleteItem, { data: deleteItemData, loading: deleteItemLoading, error: deleteItemError }] = useMutation<Mutation, MutationDeleteItemArgs>(
    DELETE_ITEM
  );

  const handleDelete = (e: any, data: any) => {


    deleteItem({
      variables: {
        _id: antique?._id,

      },
      update(cache, { data }) {

        if (!data) {
          return null;
        }

        const getExistingAntiques = cache.readQuery<Query>({ query: GET_ITEMS });
        // Add the new todo to the cache
        const existingAntiques = getExistingAntiques ? getExistingAntiques.itemList : [];
        const newAntiques = existingAntiques!.filter(t => {
          if (t)
            return (t._id !== antique._id)
        });  /* .returning[0] */;
        if (existingAntiques)
          cache.writeQuery<Query>({
            query: GET_ITEMS,
            data: { itemList: newAntiques }
          });
      }

    })
    /* dispatch(dashboardSlice.actions.setSelectedAntique({ ...selectedAntique!, images: imagesArray! })) */

  }

  const handleToggle = () => {
    var toggleValue = false
    if (antique.active === false) {
      toggleValue = true
    } else toggleValue = false

    console.log(toggleValue)

    updateItem({
      variables: {
        _id: antique?._id,
        active: toggleValue

      },
      update(cache, { data }) {

        if (!data) {
          return null;
        }

        const getExistingAntiques = cache.readQuery<Query>({ query: GET_ITEMS });

        const existingAntiques = getExistingAntiques ? getExistingAntiques.itemList : [];
        const otherAntiques = existingAntiques!.filter(t => {
          if (t)
            return (t._id !== antique._id)
        });

        const updatedAntique = updateItemData?.updateItem
        if (updatedAntique)
          cache.writeQuery<Query>({
            query: GET_ITEMS,
            data: { itemList: [updatedAntique, ...otherAntiques] }
          });
      }

    })

  }


  return (
    <Card>


      <ImageContainer>
        <AdvancedImage style={imageStyles} cldImg={myImage} plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />

      </ImageContainer>


      <CardHeading>{antique.name}</CardHeading>
      <CardSubHeading>£{antique.price}.00</CardSubHeading>

      <ButtonContainer ref={buttonRef}>
        <ImageButton onClick={() => handleClick()}>View</ImageButton>
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
            <p style={{ width: "max-content" }}>Are you sure you want to delete this item?</p>
            <Button style={{ margin: 'auto' }} onClick={handleDelete}>Delete</Button>
            <Button style={{ margin: 'auto' }} onClick={() => setDeleteButtonOpen(false)}>Cancel</Button>
          </PopupContentContainer>

        </Popup>
      </ButtonContainer>
      <CheckboxContainer>

        <ActiveText>Active:</ActiveText>
        <Checkbox
          style={{ display: "flex", margin: "auto" }}
          toggle
          /* label='Check this box' */
          onChange={handleToggle}
          checked={antique.active}
        />
        <Loader style={{ zIndex: 1500 }} inverted active={updateItemLoading} />

      </CheckboxContainer>


    </Card>

  );
};

export default DashboardAntiquesListItem