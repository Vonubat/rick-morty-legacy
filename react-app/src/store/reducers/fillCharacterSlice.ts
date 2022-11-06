import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ICharacter, IEpisode, IFillCharacterState, ILocation } from 'types/models';

const initialState: IFillCharacterState = {
  currentCharacter: null,
  locationCharacter: {
    name: '',
    type: '',
    dimension: '',
  },
  episodesCharacter: [{ name: '', air_date: '', episode: '' }],
};

export const fillCharacterPage = createAsyncThunk<
  IFillCharacterState,
  number,
  { state: RootState }
>('currentCharacterInfo/fillCharacterPage', async (id: number, { getState }) => {
  const content: IFillCharacterState = initialState;
  const results: ICharacter[] = getState().characterContent.characterContent.results;
  const locations: ILocation[] = getState().additionalData.locations;
  const episodes: IEpisode[] = getState().additionalData.episodes;

  const currentCharacter: ICharacter | undefined = results.find(
    (character: ICharacter): boolean => character.id === id
  );
  if (!currentCharacter) {
    return content;
  } else {
    content.currentCharacter = currentCharacter;
  }

  const { location: locationOfChar, episode: episodesOfChar } = currentCharacter;

  const currentLocation: ILocation | undefined = locations.find(
    (item: ILocation): boolean => locationOfChar.url === item.url
  );
  if (currentLocation) {
    content.locationCharacter = {
      name: currentLocation.name,
      type: currentLocation.type,
      dimension: currentLocation.dimension,
    };
  }

  const currentEpisodes: IEpisode[] | undefined = episodes.filter((item: IEpisode): boolean =>
    episodesOfChar.includes(item.url)
  );
  if (currentEpisodes.length && currentEpisodes !== null) {
    currentEpisodes.forEach((item: IEpisode): void => {
      content.episodesCharacter.push({
        name: item.name,
        air_date: item.air_date,
        episode: item.episode,
      });
    });
  }
  return content;
});

export const fillCharacterSlice = createSlice({
  name: 'currentCharacterInfo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fillCharacterPage.fulfilled,
      (state, action: PayloadAction<IFillCharacterState>) => {
        state.currentCharacter = action.payload.currentCharacter;
        state.locationCharacter = action.payload.locationCharacter;
        state.episodesCharacter = action.payload.episodesCharacter;
      }
    );
  },
});

export const selectCurrentCharacterInfo: (state: RootState) => IFillCharacterState = (
  state: RootState
): IFillCharacterState => state.currentCharacterInfo;
export default fillCharacterSlice.reducer;
