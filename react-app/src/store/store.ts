import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pageReducer from './reducers/pageSlice';
import additionalDataReducer from './reducers/additionalDataSlice';
import userCardsReducer from './reducers/userCardsSlice';

const rootReducer = combineReducers({
  page: pageReducer,
  additionalData: additionalDataReducer,
  userCards: userCardsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
