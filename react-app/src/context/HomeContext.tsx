import {
  ICharacterContent,
  ICharacterFilter,
  IAdditionalData,
  IEpisode,
  IFilter,
  ILocation,
  IPageIndicators,
} from 'types/models';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Api from 'api/api';
import { EPISODES, LOCATIONS } from 'constants/constants';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

interface IHomeContextState {
  isError: IPageIndicators['isError'];
  isLoading: IPageIndicators['isLoading'];
  info: ICharacterContent['info'];
  results: ICharacterContent['results'];
  locations: IAdditionalData['locations'];
  episodes: IAdditionalData['episodes'];
  isCharacterPageReady: IAdditionalData['isCharacterPageReady'];
}

interface IHomeContextUpdater {
  fetchCharacters: (filter?: IFilter) => Promise<void>;
  form: UseFormReturn<FieldValues, unknown>;
}

interface MyProps {
  children?: React.ReactNode;
}

const HomeContextState: React.Context<IHomeContextState | undefined> = createContext<
  IHomeContextState | undefined
>(undefined);

const HomeContextUpdater: React.Context<IHomeContextUpdater | undefined> = createContext<
  IHomeContextUpdater | undefined
>(undefined);

export const HomeContextProvider: ({ children }: MyProps) => JSX.Element = ({
  children,
}: MyProps): JSX.Element => {
  const contentStorage: Map<string, ICharacterContent> = useMemo(
    (): Map<string, ICharacterContent> => new Map(),
    []
  );
  const api: Api = useMemo((): Api => new Api(), []);
  const form: UseFormReturn<FieldValues, unknown> = useForm();

  const [isError, setIsError] = useState<IPageIndicators['isError']>(false);
  const [isLoading, setIsLoading] = useState<IPageIndicators['isLoading']>(false);
  const [info, setInfo] = useState<ICharacterContent['info']>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });
  const [results, setResults] = useState<ICharacterContent['results']>([]);
  const [locations, setLocations] = useState<IAdditionalData['locations']>([]);
  const [episodes, setEpisodes] = useState<IAdditionalData['episodes']>([]);
  const [isCharacterPageReady, setIsCharacterPageReady] =
    useState<IAdditionalData['isCharacterPageReady']>(false);

  const fetchCharacters: (filter?: IFilter) => Promise<void> = useCallback(
    async (filter?: IFilter): Promise<void> => {
      try {
        setIsError(false);
        const params: IFilter = filter || {
          query: (localStorage.getItem('queryValue') as ICharacterFilter) || 'name',
          value: localStorage.getItem('searchValue') || '',
        };
        const key: string = JSON.stringify(params).toLowerCase();
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

        const content: ICharacterContent = await api.getCharacters(1, params);
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
    },
    [api, contentStorage]
  );

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
    fetchCharacters();
    fetchAdditionalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeContextState.Provider
      value={{ isError, isLoading, info, results, locations, episodes, isCharacterPageReady }}
    >
      <HomeContextUpdater.Provider value={{ fetchCharacters, form }}>
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
