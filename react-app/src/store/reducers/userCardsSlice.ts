import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IUserCharacter } from 'types/models';

const initialState: IUserCharacter[] = [];

export const userCardsSlice = createSlice({
  name: 'userCardsStorage',
  initialState,
  reducers: {
    addUserCard: (state, action: PayloadAction<IUserCharacter>): void => {
      state.push(action.payload);
    },
  },
});

export const { addUserCard } = userCardsSlice.actions;
export const selectUserCardsStorage: (state: RootState) => IUserCharacter[] = (
  state: RootState
): IUserCharacter[] => state.userCards;
export default userCardsSlice.reducer;
