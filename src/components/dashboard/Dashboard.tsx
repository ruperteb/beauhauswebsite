import * as React from 'react';

import {
    motion
} from "framer-motion";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'

import styled from 'styled-components'

import AntiquesList from "./DashboardAntiquesList"
import CollectionsPanelNavigation from './DashboardlNavigation';
import AntiqueModal from './DashboardAntiqueModal';



const DashboardDiv = styled(motion.div)`
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100vw;
    box-shadow: 1px 1px 3px 2px #0000003d;
    overflow-y: scroll;
  `



interface Props {

}

export const Dashboard: React.FunctionComponent<Props> = ({ }) => {

    return (
        <DashboardDiv>
            <CollectionsPanelNavigation></CollectionsPanelNavigation>
            <AntiquesList></AntiquesList>
            <AntiqueModal></AntiqueModal>
        </DashboardDiv>
    );
};

export default Dashboard