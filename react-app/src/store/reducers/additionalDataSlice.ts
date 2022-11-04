import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from 'api/api';
import { EPISODES, LOCATIONS } from 'constants/constants';
import { RootState } from 'store/store';
import { IAdditionalData, IEpisode, ILocation } from 'types/models';

const api: Api = new Api();

const initialState: IAdditionalData = {
  locations: [],
  episodes: [],
  locationsStatus: 'idle',
  episodesStatus: 'idle',
};

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
  const content: ILocation[] = (await api.getLocationsOrEpisodes(LOCATIONS)) as ILocation[];
  return content;
});

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async () => {
  const content: IEpisode[] = (await api.getLocationsOrEpisodes(EPISODES)) as IEpisode[];
  return content;
});

export const additionalDataSlice = createSlice({
  name: 'additionalData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.locationsStatus = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locationsStatus = 'succeeded';
        state.locations = state.locations.concat(action.payload as ILocation[]);
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.locationsStatus = 'failed';
        console.error(action.error.message);
      })
      .addCase(fetchEpisodes.pending, (state) => {
        state.episodesStatus = 'loading';
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.episodesStatus = 'succeeded';
        state.episodes = state.episodes.concat(action.payload as IEpisode[]);
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.episodesStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectAdditionalData: (state: RootState) => IAdditionalData = (
  state: RootState
): IAdditionalData => state.additionalData;
export default additionalDataSlice.reducer;
