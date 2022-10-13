import { CHARACTERS } from 'constants/constants';
import { ICharacterContent } from 'types/models';
import HttpMethods from './http-methods';

class Api extends HttpMethods {
  public async getCharacters(pageNumber = 1): Promise<ICharacterContent> {
    const url: URL = new URL(`${CHARACTERS}/?page=${pageNumber}`);
    const response: Response = await this.get(url);
    console.log('Response:', response);

    if (!response.ok) {
      throw new Error(`Can't get the caracters`);
    }

    const content: ICharacterContent = await response.json();
    console.log('Content:', content);
    return content;
  }
}

export default Api;
