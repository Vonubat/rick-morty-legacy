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
