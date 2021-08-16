import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import navigationReducer from '../redux/slices/navigationSlice';
import collectionsReducer from '../redux/slices/collectionsSlice';
import dashboardReducer from '../redux/slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    collections: collectionsReducer,
    dashboard: dashboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
