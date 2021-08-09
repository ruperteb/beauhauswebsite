import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import navigationReducer from '../redux/slices/navigationSlice';
import collectionsReducer from '../redux/slices/collectionsSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    collections: collectionsReducer,
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
