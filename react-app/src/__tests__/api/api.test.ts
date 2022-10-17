import { waitFor } from '@testing-library/react';
import Api from 'api/api';
import { EPISODES, LOCATIONS } from 'constants/constants';
import { rest } from 'msw';
import {
  ICharacterContent,
  IEpisode,
  IEpisodeContent,
  ILocation,
  ILocationContent,
} from 'types/models';
import { charactersAll } from '__mocks__/characters';
import { episodes } from '__mocks__/episodes';
import { locations } from '__mocks__/locations';
import { server } from '__mocks__/server';

describe('Api functions', (): void => {
  const API: Api = new Api();
  const locationsResult: ILocation[] = locations
    .map((item: ILocationContent): ILocation[] => item.results)
    .flat();
  const episodesResult: IEpisode[] = episodes
    .map((item: IEpisodeContent): IEpisode[] => item.results)
    .flat();

  it('getCharacters method works correctly (success)', async (): Promise<void> => {
    const content: ICharacterContent = await API.getCharacters(1, {
      query: 'name',
      value: '',
    });
    expect(content).toEqual(charactersAll);
  });

  it('getCharacters method fails', async (): Promise<void> => {
    try {
      await API.getCharacters(100, {
        query: 'name',
        value: '',
      });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Can't get the caracters");
      }
    }
  });

  it('getDataForModal method works correctly (success)', async (): Promise<void> => {
    const contentLocations: ILocation[] = (await API.getDataForModal(LOCATIONS)) as ILocation[];
    await waitFor(() => {
      expect(contentLocations).toEqual(locationsResult);
    });

    const contentEpisodes: IEpisode[] = (await API.getDataForModal(EPISODES)) as IEpisode[];
    await waitFor(() => {
      expect(contentEpisodes).toEqual(episodesResult);
    });
  });

  it('getDataForModal method fails', async (): Promise<void> => {
    try {
      server.use(
        rest.get(LOCATIONS, (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ error: 'There is nothing here' }));
        })
      );

      (await API.getDataForModal(LOCATIONS)) as ILocation[];
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe(`Can't get the ${LOCATIONS}`);
      }
    }
  });
});
