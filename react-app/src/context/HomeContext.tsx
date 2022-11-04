import {
  ICharacterContent,
  IEpisode,
  IFilter,
  ILocation,
  IPageIndicators,
  IHomeContextState,
  IHomeContextUpdater,
  ICharacter,
} from 'types/models';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Api from 'api/api';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { selectPage } from 'store/reducers/pageSlice';
import {
  fetchEpisodes,
  fetchLocations,
  selectAdditionalData,
} from 'store/reducers/additionalDataSlice';

const HomeContextState: React.Context<IHomeContextState | undefined> = createContext<
  IHomeContextState | undefined
>(undefined);

const HomeContextUpdater: React.Context<IHomeContextUpdater | undefined> = createContext<
  IHomeContextUpdater | undefined
>(undefined);

interface MyProps {
  children?: React.ReactNode;
}

export const HomeContextProvider: ({ children }: MyProps) => JSX.Element = ({
  children,
}: MyProps): JSX.Element => {
  const dispatch = useAppDispatch();
  // for memoization
  const contentStorage: Map<string, ICharacterContent> = useMemo(
    (): Map<string, ICharacterContent> => new Map(),
    []
  );
  // for API
  const api: Api = useMemo((): Api => new Api(), []);
  // for Settings & SearchBar components
  const form: UseFormReturn<FieldValues, unknown> = useForm();
  // for Home page
  const [isError, setIsError] = useState<IPageIndicators['isError']>(false);
  const [isLoading, setIsLoading] = useState<IPageIndicators['isLoading']>(false);
  const [info, setInfo] = useState<ICharacterContent['info']>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });
  const [results, setResults] = useState<ICharacterContent['results']>([]);
  const { locations, locationsStatus, episodes, episodesStatus } =
    useAppSelector(selectAdditionalData);
  // for Pagination component
  const currentPage: number = useAppSelector(selectPage);
  // for Character page
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter | null>(null);
  const [locationCharacter, setLocationCharacter] = useState<
    IHomeContextState['locationCharacter']
  >({
    name: '',
    type: '',
    dimension: '',
  });
  const [episodesCharacter, setEpisodesCharacter] = useState<
    IHomeContextState['episodesCharacter']
  >([{ name: '', air_date: '', episode: '' }]);
  // ==============

  const fetchCharacters: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      setIsError(false);
      window.scrollTo(0, 0);
      const filter: IFilter = {
        page: currentPage,
        value: localStorage.getItem('searchValue') || '',
        query: form.getValues('search query') || 'name',
        gender: form.getValues('gender') || 'any',
        status: form.getValues('status') || 'any',
      };

      const key: string = JSON.stringify(filter).toLowerCase();
      setResults([]);
      setInfo({
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      });

      if (contentStorage.has(key)) {
        setInfo(contentStorage.get(key)!.info);
        setResults(contentStorage.get(key)!.results);
        return;
      }

      setIsLoading(true);

      const content: ICharacterContent = await api.getCharacters(filter);
      contentStorage.set(key, content);
      setInfo(content.info);
      setResults(content.results);

      setIsLoading(false);
    } catch (error: unknown) {
      setIsError(true);
      setIsLoading(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [api, contentStorage, form, currentPage]);

  useEffect((): void => {
    if (episodesStatus === 'idle') {
      dispatch(fetchEpisodes());
    }
    if (locationsStatus === 'idle') {
      dispatch(fetchLocations());
    }
  }, [episodesStatus, locationsStatus, dispatch]);

  useEffect((): void => {
    fetchCharacters();
  }, [fetchCharacters]);

  const fillCharacterPage: (id: number) => void = (id: number): void => {
    setLocationCharacter({
      name: '',
      type: '',
      dimension: '',
    });
    setEpisodesCharacter([{ name: '', air_date: '', episode: '' }]);

    const character: ICharacter | undefined = results.find(
      (character: ICharacter): boolean => character.id == id
    );
    if (!character) {
      return;
    }

    const { location: locationOfChar, episode: episodesOfChar } = character;
    setCurrentCharacter(character);

    const currentLocation: ILocation | undefined = locations.find(
      (item: ILocation): boolean => locationOfChar.url == item.url
    );
    if (currentLocation) {
      setLocationCharacter({
        name: currentLocation.name,
        type: currentLocation.type,
        dimension: currentLocation.dimension,
      });
    }

    const currentEpisodes: IEpisode[] | undefined = episodes.filter((item: IEpisode): boolean =>
      episodesOfChar.includes(item.url)
    );
    if (currentEpisodes.length && currentEpisodes !== null) {
      currentEpisodes.forEach((item: IEpisode): void =>
        setEpisodesCharacter(
          (
            prevState: IHomeContextState['episodesCharacter']
          ): IHomeContextState['episodesCharacter'] => {
            return [
              ...prevState,
              { name: item.name, air_date: item.air_date, episode: item.episode },
            ];
          }
        )
      );
    }
  };

  return (
    <HomeContextState.Provider
      value={{
        isError,
        isLoading,
        info,
        results,
        locations,
        episodes,
        currentCharacter,
        locationCharacter,
        episodesCharacter,
      }}
    >
      <HomeContextUpdater.Provider value={{ fetchCharacters, fillCharacterPage, form }}>
        {children}
      </HomeContextUpdater.Provider>
    </HomeContextState.Provider>
  );
};

export const useHomeContextState: () => IHomeContextState = (): IHomeContextState => {
  // get the context
  const context: IHomeContextState | undefined = useContext(HomeContextState);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useHomeContextState was used outside of its Provider');
  }
  return context;
};

export const useHomeContextUpdater: () => IHomeContextUpdater = (): IHomeContextUpdater => {
  // get the context
  const context: IHomeContextUpdater | undefined = useContext(HomeContextUpdater);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useHomeContextUpdater was used outside of its Provider');
  }
  return context;
};
