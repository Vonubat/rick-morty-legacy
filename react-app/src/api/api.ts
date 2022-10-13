import { CHARACTERS } from 'constants/constants';
import { ICharacterContent, IFilter } from 'types/models';
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
}

export default Api;
