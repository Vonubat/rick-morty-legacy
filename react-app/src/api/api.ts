import { CHARACTERS, EPISODES, LOCATIONS } from 'constants/constants';
import {
  ICharacterContent,
  IEpisode,
  IEpisodeContent,
  IFilter,
  ILocation,
  ILocationContent,
} from 'types/models';

class Api {
  public async getCharacters(filter: IFilter): Promise<ICharacterContent> {
    const url: URL = new URL(
      `${CHARACTERS}/?page=${filter.page}${filter.value ? `&${filter.query}=${filter.value}` : ''}${
        filter.gender !== 'any' ? `&gender=${filter.gender}` : ''
      }${filter.status !== 'any' ? `&status=${filter.status}` : ''}`
    );

    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error("Can't get the caracters");
    }

    const content: ICharacterContent = await response.json();
    return content;
  }

  public async getLocations(): Promise<ILocation[]> {
    let content: ILocationContent = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };

    const url: URL = new URL(`${LOCATIONS}/?page=1`);
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Can't get the LOCATIONS`);
    }

    content = await response.json();

    if (content.info.pages > 1) {
      const allUrls: URL[] = [];
      for (let i = 2; i <= content.info.pages; i++) {
        allUrls.push(new URL(`${LOCATIONS}/?page=${i}`));
      }

      await Promise.all(
        allUrls.map(async (url: URL): Promise<ILocation[]> => {
          const response: Response = await fetch(url);
          const nextContent: ILocationContent = await response.json();
          return nextContent.results;
        })
      ).then(
        (responses: ILocation[][]): ILocation[] =>
          (content.results = content.results.concat(
            ...responses.map((results: ILocation[]): ILocation[] => results)
          ))
      );
    }
    return content.results;
  }

  public async getEpisodes(): Promise<IEpisode[]> {
    let content: IEpisodeContent = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };

    const url: URL = new URL(`${EPISODES}/?page=1`);
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Can't get the EPISODES`);
    }

    content = await response.json();

    if (content.info.pages > 1) {
      const allUrls: URL[] = [];
      for (let i = 2; i <= content.info.pages; i++) {
        allUrls.push(new URL(`${EPISODES}/?page=${i}`));
      }

      await Promise.all(
        allUrls.map(async (url: URL): Promise<IEpisode[]> => {
          const response: Response = await fetch(url);
          const nextContent: IEpisodeContent = await response.json();
          return nextContent.results;
        })
      ).then(
        (responses: IEpisode[][]): IEpisode[] =>
          (content.results = content.results.concat(
            ...responses.map((results: IEpisode[]): IEpisode[] => results)
          ))
      );
    }
    return content.results;
  }
}

export default Api;
