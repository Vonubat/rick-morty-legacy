import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pageReducer from './reducers/pageSlice';
import additionalDataReducer from './reducers/additionalDataSlice';
import userCardsReducer from './reducers/userCardsSlice';
import characterContentReducer from './reducers/characterContentSlice';
import fillCharacterReducer from './reducers/fillCharacterSlice';

const rootReducer = combineReducers({
  page: pageReducer,
  additionalData: additionalDataReducer,
  userCards: userCardsReducer,
  characterContent: characterContentReducer,
  currentCharacterInfo: fillCharacterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
