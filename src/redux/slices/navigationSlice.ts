import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../redux/store';
import { current } from '@reduxjs/toolkit'


export interface NavigationState {

    windowHeight: number;
    showSidebar: boolean;
    showCollectionsPanel: boolean;
    scrollTop: boolean;

    currentPage: number;
    currentPageURL: string

    scrollY: number;
    scrollYMobile: number;

    headerHeight: number;
    homeHeight: number;
    aboutHeight: number;
    collectionsHeight: number;
    contactHeight: number;

    /* homePixelsPassed: number; */
    /* aboutPixelsPassed: number;
    collectionsPixelsPassed: number; */

    /* homeBottomPassed: boolean;
    aboutBottomPassed: boolean;
    collectionsBottomPassed: boolean; */

    headerHeightMobile: number;
    homeHeightMobile: number;
    aboutHeightMobile: number;
    collectionsHeightMobile: number;
    contactHeightMobile: number;
 
}

const initialState: NavigationState = {

    windowHeight: 0,
    showSidebar: false,
    showCollectionsPanel: false,
    scrollTop: true,

    currentPage: 0,
    currentPageURL: "#home",

    scrollY: 0,
    scrollYMobile: 0,

    headerHeight: 0,
    homeHeight: 400,
    aboutHeight: 400,
    collectionsHeight: 0,
    contactHeight: 0,

    /* homePixelsPassed: 0, */
    /* aboutPixelsPassed: 0,
    collectionsPixelsPassed: 0, */

    /* homeBottomPassed: false,
    aboutBottomPassed: false,
    collectionsBottomPassed: false,
 */
    headerHeightMobile: 0,
    homeHeightMobile: 0,
    aboutHeightMobile: 0,
    collectionsHeightMobile: 0,
    contactHeightMobile: 0,
 
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setWindowHeight: (state, action: PayloadAction<number>) => {
            state.windowHeight = action.payload; 
        },
        setSidebarVisibility: (state, action: PayloadAction<boolean>) => {
            state.showSidebar = action.payload; 
        },
        setCollectionsPanelVisibility: (state, action: PayloadAction<boolean>) => {
            state.showCollectionsPanel = action.payload; 
        },
        setScrollTop: (state, action: PayloadAction<boolean>) => {
            state.scrollTop = action.payload; 
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload; 
        },
        setCurrentPageURL: (state, action: PayloadAction<string>) => {
            state.currentPageURL = action.payload;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setScrollY: (state, action: PayloadAction<number>) => {
            state.scrollY = action.payload;
            /* console.log(current(state)) */
        },
        setHeaderHeight: (state, action: PayloadAction<number>) => {
            state.headerHeight = action.payload; 
        },
        setHomeHeight: (state, action: PayloadAction<number>) => {
            state.homeHeight = action.payload; 
        },
        setAboutHeight: (state, action: PayloadAction<number>) => {
            state.aboutHeight = action.payload; 
        },
        setCollectionsHeight: (state, action: PayloadAction<number>) => {
            state.collectionsHeight = action.payload; 
        },
        setContactHeight: (state, action: PayloadAction<number>) => {
            state.contactHeight = action.payload; 
        },
        /* setHomePixelsPassed: (state, action: PayloadAction<number>) => {
            state.homePixelsPassed = action.payload; 
        }, */
        /* setAboutPixelsPassed: (state, action: PayloadAction<number>) => {
            state.aboutPixelsPassed = action.payload; 
        },
        setCollectionsPixelsPassed: (state, action: PayloadAction<number>) => {
            state.collectionsPixelsPassed = action.payload; 
        }, */
        /* setHomeBottomPassed: (state, action: PayloadAction<boolean>) => {
            state.homeBottomPassed = action.payload; 
        },
        setAboutBottomPassed: (state, action: PayloadAction<boolean>) => {
            state.aboutBottomPassed = action.payload; 
        },
        setCollectionsBottomPassed: (state, action: PayloadAction<boolean>) => {
            state.collectionsBottomPassed = action.payload; 
        }, */
        setScrollYMobile: (state, action: PayloadAction<number>) => {
            state.scrollYMobile = action.payload;
            /* console.log(current(state)) */
        },
        setHeaderHeightMobile: (state, action: PayloadAction<number>) => {
            state.headerHeight = action.payload; 
        },
        setHomeHeightMobile: (state, action: PayloadAction<number>) => {
            state.homeHeightMobile = action.payload; 
        },
        setAboutHeightMobile: (state, action: PayloadAction<number>) => {
            state.aboutHeightMobile = action.payload; 
        },
        setCollectionsHeightMobile: (state, action: PayloadAction<number>) => {
            state.collectionsHeightMobile = action.payload; 
        },
        setContactHeightMobile: (state, action: PayloadAction<number>) => {
            state.contactHeightMobile = action.payload; 
        },
        
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    /* extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            });
    }, */
});

export const {setWindowHeight, setSidebarVisibility, setCollectionsPanelVisibility, setScrollTop, setCurrentPage, setCurrentPageURL, setScrollY, setHeaderHeight, setHomeHeight, setAboutHeight, setCollectionsHeight, setContactHeight, /* setHomePixelsPassed, */ /* setAboutPixelsPassed, setCollectionsPixelsPassed, */ /* setHomeBottomPassed, setAboutBottomPassed, setCollectionsBottomPassed, */ setScrollYMobile, setHeaderHeightMobile, setHomeHeightMobile, setAboutHeightMobile, setCollectionsHeightMobile, setContactHeightMobile  } = navigationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectWindowHeight = (state: RootState) => state.navigation.windowHeight;

export const selectShowSidebar = (state: RootState) => state.navigation.showSidebar;

export const selectShowCollectionsPanel = (state: RootState) => state.navigation.showCollectionsPanel;

export const selectScrollTop = (state: RootState) => state.navigation.scrollTop;

export const selectCurrentPage = (state: RootState) => state.navigation.currentPage;

export const selectCurrentPageURL = (state: RootState) => state.navigation.currentPageURL;

export const selectScrollY = (state: RootState) => state.navigation.scrollY;

export const selectHeaderHeight = (state: RootState) => state.navigation.headerHeight;

export const selectHomeHeight = (state: RootState) => state.navigation.homeHeight;

export const selectAboutHeight = (state: RootState) => state.navigation.aboutHeight;

export const selectAboutBottom = (state: RootState) => state.navigation.headerHeight + state.navigation.homeHeight + state.navigation.aboutHeight ;

export const selectCollectionsHeight = (state: RootState) => state.navigation.collectionsHeight;

export const selectContactHeight = (state: RootState) => state.navigation.contactHeight;

export const selectHomePixelsPassed = (state: RootState) => state.navigation.scrollY + state.navigation.windowHeight - state.navigation.headerHeight;

export const selectAboutPixelsPassed = (state: RootState) => state.navigation.scrollY + state.navigation.windowHeight - state.navigation.headerHeight - state.navigation.homeHeight;

/* export const selectCollectionsPixelsPassed = (state: RootState) => state.navigation.collectionsPixelsPassed; */
export const selectCollectionsPixelsPassed = (state: RootState) => state.navigation.scrollY + state.navigation.windowHeight - state.navigation.headerHeight - state.navigation.homeHeight - state.navigation.aboutHeight;

export const selectContactPixelsPassed = (state: RootState) => state.navigation.scrollY + state.navigation.windowHeight - state.navigation.headerHeight - state.navigation.homeHeight - state.navigation.aboutHeight - state.navigation.collectionsHeight;
/* export const selectHomeBottomPassed = (state: RootState) => state.navigation.homeBottomPassed;

export const selectAboutBottomPassed = (state: RootState) => state.navigation.aboutBottomPassed;

export const selectCollectionsBottomPassed = (state: RootState) => state.navigation.collectionsBottomPassed; */

export const selectScrollYMobile = (state: RootState) => state.navigation.scrollYMobile;

export const selectHeaderHeightMobile = (state: RootState) => state.navigation.headerHeightMobile;

export const selectHomeHeightMobile = (state: RootState) => state.navigation.homeHeightMobile;

export const selectAboutHeightMobile = (state: RootState) => state.navigation.aboutHeightMobile;

export const selectAboutBottomMobile = (state: RootState) => state.navigation.headerHeightMobile + state.navigation.homeHeightMobile + state.navigation.aboutHeightMobile ;

export const selectCollectionsHeightMobile = (state: RootState) => state.navigation.collectionsHeightMobile;

export const selectContactHeightMobile = (state: RootState) => state.navigation.contactHeightMobile;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/* export const incrementIfOdd = (amount: number): AppThunk => (
    dispatch,
    getState
) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
    }
}; */

export default navigationSlice.reducer;
