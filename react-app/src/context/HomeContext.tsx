import {
  IEpisode,
  ILocation,
  IHomeContextState,
  IHomeContextUpdater,
  ICharacter,
} from 'types/models';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { selectPage } from 'store/reducers/pageSlice';
import {
  fetchEpisodes,
  fetchLocations,
  selectAdditionalData,
} from 'store/reducers/additionalDataSlice';
import { fetchCharacters, selectResults } from 'store/reducers/characterContentSlice';

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
  const { locations, locationsStatus, episodes, episodesStatus } =
    useAppSelector(selectAdditionalData);
  const results: ICharacter[] = useAppSelector(selectResults);
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

  useEffect((): void => {
    if (episodesStatus === 'idle') {
      dispatch(fetchEpisodes());
    }
    if (locationsStatus === 'idle') {
      dispatch(fetchLocations());
    }
  }, [episodesStatus, locationsStatus, dispatch]);

  useEffect((): void => {
    dispatch(fetchCharacters());
  }, [currentPage, dispatch]);

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
        locations,
        episodes,
        currentCharacter,
        locationCharacter,
        episodesCharacter,
      }}
    >
      <HomeContextUpdater.Provider value={{ fillCharacterPage }}>
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
