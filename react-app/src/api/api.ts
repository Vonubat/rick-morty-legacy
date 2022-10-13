import { CHARACTERS, EPISODES, LOCATIONS } from 'constants/constants';
import { ICharacterContent, IEpisode, IFilter, ILocation, ILocationContent } from 'types/models';
import HttpMethods from './http-methods';

class Api extends HttpMethods {
  public async getCharacters(pageNumber = 1, filter: IFilter): Promise<ICharacterContent> {
    let url: URL = new URL(`${CHARACTERS}/?page=${pageNumber}`);

    if (filter.value) {
      url = new URL(`${url}&${filter.query}=${filter.value}`);
    }

    const response: Response = await this.get(url);

    if (!response.ok) {
      throw new Error("Can't get the caracters");
    }

    const content: ICharacterContent = await response.json();
    return content;
  }

  public async getDataForModal(
    type: typeof LOCATIONS | typeof EPISODES
  ): Promise<ILocation[] | IEpisode[]> {
    let content: ILocationContent = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };

    const url: URL = new URL(`${type}/?page=1`);
    const response: Response = await this.get(url);

    if (!response.ok) {
      throw new Error(`Can't get the ${type}`);
    }

    content = await response.json();

    if (content.info.pages > 1) {
      const allUrls: URL[] = [];
      for (let i = 2; i <= content.info.pages; i++) {
        allUrls.push(new URL(`${type}/?page=${i}`));
      }

      const requests: Promise<ILocation[]>[] = allUrls.map(
        async (url: URL): Promise<ILocation[]> => {
          const response: Response = await this.get(url);
          if (!response.ok) {
            throw new Error(`Can't get the ${type}`);
          }
          const nextContent: ILocationContent = await response.json();
          return nextContent.results;
        }
      );

      Promise.all(requests).then((responses: ILocation[][]): void =>
        responses.forEach((results: ILocation[]): void => {
          content.results.push(...results);
        })
      );
    }

    return content.results;
  }
}

export default Api;
