export interface IOrigin {
  name: string;
  url: string;
}

export interface ILocation {
  name: string;
  url: string;
}

export interface ICharacterSchema {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface IUserCharacterSchema {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  created: string;
}
