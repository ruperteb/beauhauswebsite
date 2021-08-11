import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { current } from '@reduxjs/toolkit'
import { Item } from "../../schematypes/schematypes"


export interface CollectionsState {

    typeFilter: string;
    priceLowFilter: number;
    priceHighFilter: number;

    selectedAntique: Item | null;
    showAntiqueModal: boolean;

 
}

const initialState: CollectionsState = {

    typeFilter: "",
    priceLowFilter: 0,
    priceHighFilter: 0,

    selectedAntique: null ,
    showAntiqueModal: false,
 
};

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTypeFilter: (state, action: PayloadAction<string>) => {
            state.typeFilter = action.payload;
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

    },
   
});

export const {setTypeFilter, setPriceLowFilter, setPriceHighFilter, setSelectedAntique, setShowAntiqueModal } = collectionsSlice.actions;

export const selectTypeFilter = (state: RootState) => state.collections.typeFilter;

export const selectPriceLowFilter = (state: RootState) => state.collections.priceLowFilter;

export const selectPriceHighFilter = (state: RootState) => state.collections.priceHighFilter;

export const selectSelectedAntique = (state: RootState) => state.collections.selectedAntique;

export const selectShowAntiqueModal = (state: RootState) => state.collections.showAntiqueModal;


export default collectionsSlice.reducer;
