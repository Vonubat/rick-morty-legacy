import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pageReducer from './reducers/pageSlice';

const rootReducer = combineReducers({ page: pageReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
