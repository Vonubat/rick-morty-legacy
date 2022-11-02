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
  const contentStorage: Map<string, ICharacterContent> = useMemo(
    (): Map<string, ICharacterContent> => new Map(),
    []
  );
  const api: Api = useMemo((): Api => new Api(), []);
  const form: UseFormReturn<FieldValues, unknown> = useForm();

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
  const [currentPage, dispatchPage] = useReducer(pageReducer, 1);

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
      }}
    >
      <HomeContextUpdater.Provider value={{ fetchCharacters, form, dispatchPage }}>
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
