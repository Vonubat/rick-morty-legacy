import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { IPageState } from 'types/models';

const initialState: IPageState = {
  currentPage: 1,
};

export const pageSlice = createSlice({
  name: 'pageNumber',
  initialState,
  reducers: {
    incrementPage: (state): void => {
      state.currentPage += 1;
    },
    decrementPage: (state): void => {
      state.currentPage -= 1;
    },
    setPage: (state, action: PayloadAction<number>): void => {
      state.currentPage = action.payload;
    },
  },
});

export const { incrementPage, decrementPage, setPage } = pageSlice.actions;
export const selectPage: (state: RootState) => number = (state: RootState): number =>
  state.page.currentPage;
export default pageSlice.reducer;
