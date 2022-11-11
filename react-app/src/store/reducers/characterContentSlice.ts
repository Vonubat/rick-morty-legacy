import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from 'api/api';
import { RootState } from 'store/store';
import {
  ICharacter,
  ICharacterContent,
  ICharacterContentState,
  IFilter,
  IGender,
  IInfo,
  IQuery,
  IStatus,
  StatusType,
} from 'types/models';

const api: Api = new Api();

const contentStorage: Map<string, ICharacterContent> = new Map();

const initialState: ICharacterContentState = {
  characterContent: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  },
  status: 'idle',
};

export const fetchCharacters = createAsyncThunk<
  ICharacterContent | undefined,
  { query: IQuery; gender: IGender; status: IStatus } | undefined,
  { state: RootState }
>('characterContent/fetchCharacters', async (arg, { getState }) => {
  window.scrollTo(0, 0);

  const { currentPage: page } = getState().page;
  const value: string = localStorage.getItem('searchValue') || '';
  const query: IQuery = arg?.query || 'name';
  const gender: IGender = arg?.gender || 'any';
  const status: IStatus = arg?.status || 'any';

  const filter: IFilter = {
    page,
    value,
    query,
    gender,
    status,
  };

  const key: string = JSON.stringify(filter).toLowerCase();
  if (contentStorage.has(key)) {
    return contentStorage.get(key);
  }

  const content: ICharacterContent = await api.getCharacters(filter);
  contentStorage.set(key, content);
  return content;
});

export const characterContentSlice = createSlice({
  name: 'characterContent',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.characterContent = {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characterContent = action.payload as ICharacterContent;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectInfo: (state: RootState) => IInfo = (state: RootState): IInfo =>
  state.characterContent.characterContent.info;
export const selectResults: (state: RootState) => ICharacter[] = (state: RootState): ICharacter[] =>
  state.characterContent.characterContent.results;
export const selectCharactersStatus: (state: RootState) => StatusType = (
  state: RootState
): StatusType => state.characterContent.status;
export default characterContentSlice.reducer;
