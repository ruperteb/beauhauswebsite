import * as React from 'react';
import { createRef } from "react"

import {Container} from 'semantic-ui-react'

import { Query, Item } from "../../schematypes/schematypes"
import { useQuery } from '@apollo/client';

import { GET_ITEMS} from "../../gql/gql"

import { useAppSelector} from '../../redux/hooks'

import AntiquesListItemMobile from "./AntiquesListItemMobile"

import FlipMove from 'react-flip-move';
import AnimatedListItem from "./AnimatedListItem"

import styled from 'styled-components'

const StyledContainer = styled(Container)`
&&&&&&&& {
  padding: 0;
  position: relative;
  margin-top: 0;
  height: 100vh;
  margin-left: auto !important;
  margin-right: auto !important;
}


`


interface Props {
  /* propertyData: Query | undefined
  search: string | undefined */
}

export const AntiquesListMobile: React.FunctionComponent<Props> = ({ /* propertyData, search */ }) => {

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError
  } = useQuery<Query>(GET_ITEMS);

  const typeFilter = useAppSelector((state) => state.collections.typeFilter)
  const search = useAppSelector((state) => state.collections.search)

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
     if(antique.active === false) return false
    if (typeFilter !== "" && typeFilter !== "all" ) { if /* (!typeFilter?.includes(antique.type)) */ (typeFilter !== antique.type) return false }
    return true
  }

  const filteredAntiques = antiquesList?.filter(filterFunction);

  const searchSortedProperties = filteredAntiques?.filter(antique => {
    return antique?.name.toLowerCase().includes(search!.toLowerCase())
  })

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
    display: "flex",
    flexFlow: "row wrap",
    width: "100%",
    marginTop: "2rem",


    /*  width: "35%" */
  }

  return (
    <StyledContainer>
      

          <FlipMove enterAnimation={"elevator"} /* onFinish={forceCheck} */ style={flipMoveStyles}>
            {searchSortedProperties?.map(antique => {
              return (


            
                  <AnimatedListItem key={antique?._id} ref={createRef()}>

                    <AntiquesListItemMobile key={antique?._id} antique={antique}> </AntiquesListItemMobile>

                  </AnimatedListItem>
               


              )
            })}

          </FlipMove>

        
    </StyledContainer >


    /* <div style={{ marginTop: 180, zIndex: 0 }}>
  </div> */

  );
};

export default AntiquesListMobile