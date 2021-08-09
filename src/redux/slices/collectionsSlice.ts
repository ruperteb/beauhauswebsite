import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { current } from '@reduxjs/toolkit'


export interface CollectionsState {

    typeFilter: string;
    priceLowFilter: number;
    priceHighFilter: number;

    selectedAntique: string;

 
}

const initialState: CollectionsState = {

    typeFilter: "",
    priceLowFilter: 0,
    priceHighFilter: 0,

    selectedAntique: "" ,
 
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
        setSelectedAntique: (state, action: PayloadAction<string>) => {
            state.typeFilter = action.payload;
        },

    },
   
});

export const {setTypeFilter, setPriceLowFilter, setPriceHighFilter, setSelectedAntique } = collectionsSlice.actions;

export const selectTypeFilter = (state: RootState) => state.collections.typeFilter;

export const selectPriceLowFilter = (state: RootState) => state.collections.priceLowFilter;

export const selectPriceHighFilter = (state: RootState) => state.collections.priceHighFilter;

export const selectSelectedAntique = (state: RootState) => state.collections.selectedAntique;


export default collectionsSlice.reducer;
