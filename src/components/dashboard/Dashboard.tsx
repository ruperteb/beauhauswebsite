import * as React from 'react';

import {
    motion
} from "framer-motion";

import styled from 'styled-components'

import DashboardAntiquesList from "./DashboardAntiquesList"
import DashboardNavigation from './DashboardlNavigation';
import DashboardAntiqueModal from './DashboardAntiqueModal';
import DashboardHeader from './DashboardHeader';
import DashboardNewAntiqueModal from './DashboardNewAntiqueModal';



const DashboardDiv = styled(motion.div)`
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100vw;
    /* box-shadow: 1px 1px 3px 2px #0000003d; */
    /* overflow-y: scroll; */
  `



interface Props {

}

export const Dashboard: React.FunctionComponent<Props> = ({ }) => {

    return (
        <DashboardDiv>
            <DashboardHeader></DashboardHeader>
            <DashboardNavigation></DashboardNavigation>
            <DashboardAntiquesList></DashboardAntiquesList>
            <DashboardAntiqueModal></DashboardAntiqueModal>
            <DashboardNewAntiqueModal></DashboardNewAntiqueModal>
        </DashboardDiv>
    );
};

export default Dashboard