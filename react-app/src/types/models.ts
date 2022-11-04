import { FieldValues, UseFormReturn } from 'react-hook-form';

// API data interfaces & types
export interface IInfo {
  count: number;
  pages: number;
  next: URL | string | null;
  prev: URL | string | null;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IUserCharacter {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  created: string;
}

export interface ICharacterContent {
  info: IInfo;
  results: ICharacter[];
}

export interface ILocationContent {
  info: IInfo;
  results: ILocation[];
}

export interface IEpisodeContent {
  info: IInfo;
  results: IEpisode[];
}
type IQuery = 'name' | 'species';
type IGender = 'any' | 'female' | 'male' | 'genderless' | 'unknown';
type IStatus = 'any' | 'alive' | 'dead' | 'unknown';

export interface IFilter {
  page: number;
  value: string;
  query: IQuery;
  gender: IGender;
  status: IStatus;
}

// Internal interfaces
export interface IPageIndicators {
  isError: boolean;
  isLoading: boolean;
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IAdditionalData {
  locations: ILocation[];
  episodes: IEpisode[];
  locationsStatus: StatusType;
  episodesStatus: StatusType;
}

export interface IHomeContextState {
  isError: IPageIndicators['isError'];
  isLoading: IPageIndicators['isLoading'];
  info: ICharacterContent['info'];
  results: ICharacterContent['results'];
  locations: IAdditionalData['locations'];
  episodes: IAdditionalData['episodes'];
  currentCharacter: ICharacter | null;
  locationCharacter: { name: string; type: string; dimension: string };
  episodesCharacter: { name: string; air_date: string; episode: string }[];
}

export interface IHomeContextUpdater {
  fetchCharacters: () => Promise<void>;
  form: UseFormReturn<FieldValues, unknown>;
  fillCharacterPage: (id: number) => void;
}

export interface IFormsContextState {
  formsPageForm: UseFormReturn<FieldValues, unknown>;
}

export interface IPageState {
  currentPage: number;
}
