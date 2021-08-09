import * as React from 'react';
import { createRef } from "react"

import { Query, Item } from "../../schematypes/schematypes"
import { useQuery } from '@apollo/client';

import { GET_ITEMS, GET_SINGLE_ITEM } from "../../gql/gql"

import { useAppSelector, useAppDispatch } from '../../redux/hooks'

import AntiquesListItem from "./AntiquesListItem"

import FlipMove from 'react-flip-move';
import AnimatedListItem from "./AnimatedListItem"


interface Props {
  /* propertyData: Query | undefined
  search: string | undefined */
}

export const AntiquesList: React.FunctionComponent<Props> = ({ /* propertyData, search */ }) => {

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError
  } = useQuery<Query>(GET_ITEMS);

  const typeFilter = useAppSelector((state) => state.collections.typeFilter)

  console.log(itemData)


  var antiquesList = itemData?.itemList
  /* var originalProperties = originalPropertyData!.properties! */

  const filterFunction = (antique: Item) => {
   /*  if (filterData?.filterVariables!.suburb!.length !== 0) { if (!filterData?.filterVariables!.suburb?.includes(property.suburb!)) return false }
    if (filterData?.filterVariables!.region!.length !== 0) { if (!filterData?.filterVariables!.region?.includes(property.region!)) return false }
    if (filterData?.filterVariables!.province!.length !== 0) { if (!filterData?.filterVariables!.province?.includes(property.province!)) return false }
    if (filterData?.filterVariables!.buildingType!.length !== 0) { if (!filterData?.filterVariables!.buildingType?.includes(property.buildingType!)) return false }
    if (filterData?.filterVariables!.landlord!.length !== 0) { if (!filterData?.filterVariables!.landlord?.includes(property.contact?.landlordName?.landlordName!)) return false }
    if (filterData?.filterVariables!.vacantGLAMin! !== 0 || filterData?.filterVariables!.vacantGLAMax! !== 0) { if (filterData?.filterVariables!.vacantGLAMin! >= getVacantGLA(property)) return false }
    if (filterData?.filterVariables!.vacantGLAMax! !== 0) { if (filterData?.filterVariables!.vacantGLAMax! <= getVacantGLA(property)) return false }
    if (!checkDatesEqual(filterData?.filterVariables!.earliestOccMin, startDate)) { if (!checkDatesGreaterThanOrEqual(getEarliestOccDate(property), filterData?.filterVariables!.earliestOccMin)) return false }
    if (!checkDatesEqual(filterData?.filterVariables!.earliestOccMax, startDate)) { if (!checkDatesLessThanOrEqual(getEarliestOccDate(property), filterData?.filterVariables!.earliestOccMax)) return false }
    return true */
    if (typeFilter !== "") { if (!typeFilter?.includes(antique.type)) return false }
    return true
  }

  const filteredAntiques = antiquesList?.filter(filterFunction);

  /* const searchSortedProperties = filteredProperties?.filter(property => {
    if (property !== null && property !== undefined) {
      if (property?.address !== null && property?.address !== undefined) {
        if (property?.suburb !== null && property?.suburb !== undefined) {
          if (property?.region !== null && property?.region !== undefined) {
            if (property?.province !== null && property?.province !== undefined) {
              return property?.propertyName.toLowerCase().includes(search!.toLowerCase()) || property?.address.toLowerCase().includes(search!.toLowerCase()) || property?.suburb.toLowerCase().includes(search!.toLowerCase()) || property?.region.toLowerCase().includes(search!.toLowerCase()) || property?.province.toLowerCase().includes(search!.toLowerCase())
            }
          }
        }
      }
    }
  }) */

  const flipMoveStyles = {
    /* display: "flex",
    flexFlow: "row wrap",
    width: "100%" */


    /*  width: "35%" */
  }

  return (
    <div style={{ marginTop: 180, zIndex: 0 }}>
      <FlipMove enterAnimation={"elevator"} /* onFinish={forceCheck} */ style={flipMoveStyles}>
        {antiquesList?.map(antique => {
          return (

           

              <AnimatedListItem key={antique?._id} ref={createRef()}>

                <AntiquesListItem key={antique?._id} antique={antique}> </AntiquesListItem>

              </AnimatedListItem>

            

          )
        })}

      </FlipMove>

    </div>

  );
};

export default AntiquesList