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
    const content: ICharacterContent = await API.getCharacters({
      page: 1,
      value: '',
      query: 'name',
      gender: 'any',
      status: 'any',
    });
    expect(content).toEqual(charactersAll);
  });

  it('getCharacters method fails', async (): Promise<void> => {
    try {
      await API.getCharacters({
        page: 100,
        value: '',
        query: 'name',
        gender: 'any',
        status: 'any',
      });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Can't get the caracters");
      }
    }
  });

  it('getLocations and getEpisodes method works correctly (success)', async (): Promise<void> => {
    const contentLocations: ILocation[] = await API.getLocations();
    await waitFor(() => {
      expect(contentLocations).toEqual(locationsResult);
    });

    const contentEpisodes: IEpisode[] = await API.getEpisodes();
    await waitFor(() => {
      expect(contentEpisodes).toEqual(episodesResult);
    });
  });

  it('getLocations and getEpisodes method fails', async (): Promise<void> => {
    try {
      server.use(
        rest.get(LOCATIONS, (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ error: 'There is nothing here' }));
        })
      );

      await API.getLocations();
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe(`Can't get the LOCATIONS`);
      }
    }
  });

  it('getEpisodes method fails', async (): Promise<void> => {
    try {
      server.use(
        rest.get(EPISODES, (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ error: 'There is nothing here' }));
        })
      );

      await API.getEpisodes();
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe(`Can't get the EPISODES`);
      }
    }
  });
});
