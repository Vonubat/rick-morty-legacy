// API data interfaces & types
export interface IInfo {
  count: number;
  pages: number;
  next: URL | null;
  prev: URL | null;
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
  created: Date;
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

export type ICharacterFilter = 'name' | 'status' | 'species' | 'type' | 'gender';

export interface IFilter {
  query: ICharacterFilter;
  value: string;
}

// Internal interfaces
export interface IPageIndicators {
  error: boolean;
  loading: boolean;
}
