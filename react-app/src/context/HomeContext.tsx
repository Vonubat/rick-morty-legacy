import {
  ICharacterContent,
  IAdditionalData,
  IEpisode,
  IFilter,
  ILocation,
  IPageIndicators,
  IHomeContextState,
  IHomeContextUpdater,
  ActionPage,
  ICharacter,
} from 'types/models';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import Api from 'api/api';
import { EPISODES, LOCATIONS } from 'constants/constants';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

const HomeContextState: React.Context<IHomeContextState | undefined> = createContext<
  IHomeContextState | undefined
>(undefined);

const HomeContextUpdater: React.Context<IHomeContextUpdater | undefined> = createContext<
  IHomeContextUpdater | undefined
>(undefined);

const pageReducer: (currentPage: number, action: ActionPage) => number = (
  currentPage: number,
  action: ActionPage
): number => {
  switch (action.type) {
    case 'increment':
      return currentPage + action.payload;
    case 'decrement':
      return currentPage - action.payload;
    case 'set':
      currentPage = action.payload;
      return currentPage;
    default:
      throw new Error(`Unknown action type`);
  }
};

interface MyProps {
  children?: React.ReactNode;
}

export const HomeContextProvider: ({ children }: MyProps) => JSX.Element = ({
  children,
}: MyProps): JSX.Element => {
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
  const [isCharacterPageReady, setIsCharacterPageReady] =
    useState<IAdditionalData['isCharacterPageReady']>(false);
  const [info, setInfo] = useState<ICharacterContent['info']>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });
  const [results, setResults] = useState<ICharacterContent['results']>([]);
  const [locations, setLocations] = useState<IAdditionalData['locations']>([]);
  const [episodes, setEpisodes] = useState<IAdditionalData['episodes']>([]);
  // for Pagination component
  const [currentPage, dispatchPage] = useReducer(pageReducer, 1);
  // for Character page
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter | null>(null);
  const [locationCharacter, setLocationCharacter] = useState<IAdditionalData['locationCharacter']>({
    name: '',
    type: '',
    dimension: '',
  });
  const [episodesCharacter, setEpisodesCharacter] = useState<IAdditionalData['episodesCharacter']>([
    { name: '', air_date: '', episode: '' },
  ]);
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

  const fetchAdditionalData: () => void = useCallback(async (): Promise<void> => {
    try {
      setIsError(false);
      setIsLoading(true);

      setLocations((await api.getLocationsOrEpisodes(LOCATIONS)) as ILocation[]);
      setEpisodes((await api.getLocationsOrEpisodes(EPISODES)) as IEpisode[]);

      setIsCharacterPageReady(true);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [api]);

  useEffect((): void => {
    fetchAdditionalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            prevState: IAdditionalData['episodesCharacter']
          ): IAdditionalData['episodesCharacter'] => {
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
        isCharacterPageReady,
        currentPage,
        currentCharacter,
        locationCharacter,
        episodesCharacter,
      }}
    >
      <HomeContextUpdater.Provider
        value={{ fetchCharacters, dispatchPage, fillCharacterPage, form }}
      >
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
