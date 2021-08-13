import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { current } from '@reduxjs/toolkit'
import { Item } from "../../schematypes/schematypes"


export interface CollectionsState {

    typeFilter: string;
    search: string | undefined;
    priceLowFilter: number;
    priceHighFilter: number;

    selectedAntique: Item | null;
    showAntiqueModal: boolean;
    showAntiqueEnquiryModal: boolean;

 
}

const initialState: CollectionsState = {

    typeFilter: "",
    search: "",
    priceLowFilter: 0,
    priceHighFilter: 0,

    selectedAntique: null ,
    showAntiqueModal: false,
    showAntiqueEnquiryModal: false,
 
};

export const collectionsSlice = createSlice({
    name: 'collections',
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
        setShowAntiqueEnquiryModal: (state, action: PayloadAction<boolean>) => {
            state.showAntiqueEnquiryModal = action.payload;
        },

    },
   
});

export const {setTypeFilter, setSearch, setPriceLowFilter, setPriceHighFilter, setSelectedAntique, setShowAntiqueModal, setShowAntiqueEnquiryModal } = collectionsSlice.actions;

export const selectTypeFilter = (state: RootState) => state.collections.typeFilter;

export const selectSearch = (state: RootState) => state.collections.search;

export const selectPriceLowFilter = (state: RootState) => state.collections.priceLowFilter;

export const selectPriceHighFilter = (state: RootState) => state.collections.priceHighFilter;

export const selectSelectedAntique = (state: RootState) => state.collections.selectedAntique;

export const selectShowAntiqueModal = (state: RootState) => state.collections.showAntiqueModal;

export const selectShowAntiqueEnquiryModal = (state: RootState) => state.collections.showAntiqueEnquiryModal;


export default collectionsSlice.reducer;
