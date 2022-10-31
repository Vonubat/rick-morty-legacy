export interface IOrigin {
  name: string;
  url: string;
}

export interface ILocation {
  name: string;
  url: string;
}

export interface ICharacter {
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

export interface IUserCharacter {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  created: string;
}

export interface IGetFormElementsFn {
  fileElement: HTMLInputElement;
  nameElement: HTMLInputElement;
  statusElement: HTMLSelectElement;
  speciesElement: HTMLInputElement;
  genderElement: HTMLSelectElement;
  dateElement: HTMLInputElement;
  checkboxElement: HTMLInputElement;
}
