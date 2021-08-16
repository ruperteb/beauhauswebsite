import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { current } from '@reduxjs/toolkit'
import { Item } from "../../schematypes/schematypes"


export interface DashboardState {

    typeFilter: string;
    search: string | undefined;
    priceLowFilter: number;
    priceHighFilter: number;

    selectedAntique: Item | null;
    showAntiqueModal: boolean;
    showNewAntiqueModal: boolean;
    showUpdateAntiqueModal: boolean;

 
}

const initialState: DashboardState = {

    typeFilter: "",
    search: "",
    priceLowFilter: 0,
    priceHighFilter: 0,

    selectedAntique: null ,
    showAntiqueModal: false,
    showNewAntiqueModal: false,
    showUpdateAntiqueModal: false,
 
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTypeFilter: (state, action: PayloadAction<string>) => {
            state.typeFilter = action.payload;
        },
        setSearch: (state, action: PayloadAction<string|undefined>) => {
            state.search = action.payload;
        },
        setPriceLowFilter: (state, action: PayloadAction<number>) => {
            state.priceLowFilter = action.payload; 
        },
        setPriceHighFilter: (state, action: PayloadAction<number>) => {
            state.priceHighFilter = action.payload; 
        },
        setSelectedAntique: (state, action: PayloadAction<Item>) => {
            state.selectedAntique = action.payload;
        },
        setShowAntiqueModal: (state, action: PayloadAction<boolean>) => {
            state.showAntiqueModal = action.payload;
        },
        setShowNewAntiqueModal: (state, action: PayloadAction<boolean>) => {
            state.showNewAntiqueModal = action.payload;
        },
        setShowUpdateAntiqueModal: (state, action: PayloadAction<boolean>) => {
            state.showUpdateAntiqueModal = action.payload;
        },

    },
   
});

export const {setTypeFilter, setSearch, setPriceLowFilter, setPriceHighFilter, setSelectedAntique, setShowAntiqueModal, setShowNewAntiqueModal, setShowUpdateAntiqueModal } = dashboardSlice.actions;

export const selectTypeFilter = (state: RootState) => state.dashboard.typeFilter;

export const selectSearch = (state: RootState) => state.dashboard.search;

export const selectPriceLowFilter = (state: RootState) => state.dashboard.priceLowFilter;

export const selectPriceHighFilter = (state: RootState) => state.dashboard.priceHighFilter;

export const selectSelectedAntique = (state: RootState) => state.dashboard.selectedAntique;

export const selectShowAntiqueModal = (state: RootState) => state.dashboard.showAntiqueModal;

export const selectShowNewAntiqueModal = (state: RootState) => state.dashboard.showNewAntiqueModal;

export const selectShowUpdateAntiqueModal = (state: RootState) => state.dashboard.showUpdateAntiqueModal;


export default dashboardSlice.reducer;
