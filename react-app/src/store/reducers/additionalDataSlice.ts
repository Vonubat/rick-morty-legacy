import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from 'api/api';
import { RootState } from 'store/store';
import { IAdditionalData, IEpisode, ILocation } from 'types/models';

const api: Api = new Api();

const initialState: IAdditionalData = {
  locations: [],
  episodes: [],
  locationsStatus: 'idle',
  episodesStatus: 'idle',
};

export const fetchLocations = createAsyncThunk<ILocation[], void, { state: RootState }>(
  'locations/fetchLocations',
  async (): Promise<ILocation[]> => {
    const content: ILocation[] = await api.getLocations();
    return content;
  },
  {
    condition: (_: void, { getState }): false | undefined => {
      const { additionalData } = getState();
      const { locationsStatus } = additionalData;
      if (locationsStatus === 'succeeded' || locationsStatus === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
    },
  }
);

export const fetchEpisodes = createAsyncThunk<IEpisode[], void, { state: RootState }>(
  'episodes/fetchEpisodes',
  async (): Promise<IEpisode[]> => {
    const content: IEpisode[] = await api.getEpisodes();
    return content;
  },
  {
    condition: (_: void, { getState }): false | undefined => {
      const { additionalData } = getState();
      const { episodesStatus } = additionalData;
      if (episodesStatus === 'succeeded' || episodesStatus === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
    },
  }
);

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
        state.locations = state.locations.concat(action.payload);
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
        state.episodes = state.episodes.concat(action.payload);
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
