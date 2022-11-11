import { Card } from 'components/Card';
import { SearchBar } from 'components/SearchBar';
import {
  ICharacter,
  ICharacterContent,
  ICharacterFilter,
  IDataForModal,
  IEpisode,
  IFilter,
  ILocation,
  IPageIndicators,
} from 'types/models';
import React, { useEffect, useState } from 'react';
import Api from 'api/api';
import { LoadIndicator } from 'components/UI/Indicators/Load';
import { ErrorIndicator } from 'components/UI/Indicators/Error';
import { Modal } from 'components/Modal';
import { EPISODES, LOCATIONS } from 'constants/constants';

export const Home: () => JSX.Element = (): JSX.Element => {
  const api: Api = new Api();
  const [error, setError] = useState<IPageIndicators['error']>(false);
  const [loading, setLoading] = useState<IPageIndicators['loading']>(false);
  // for future functionality
  /*   const [info, setInfo] = useState<ICharacterContent['info']>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  }); */
  const [results, setResults] = useState<ICharacterContent['results']>([]);
  const [locations, setLocations] = useState<IDataForModal['locations']>([]);
  const [episodes, setEpisodes] = useState<IDataForModal['episodes']>([]);
  const [nameModal, setNameModal] = useState<IDataForModal['nameModal']>('');
  const [btnModalDisabled, setBtnModalDisabled] = useState<IDataForModal['btnModalDisabled']>(true);
  const [locationModal, setLocationModal] = useState<IDataForModal['locationModal']>({
    name: '',
    type: '',
    dimension: '',
  });
  const [episodesModal, setEpisodesModal] = useState<IDataForModal['episodesModal']>([
    { name: '', air_date: '', episode: '' },
  ]);

  const fetchCharacters: (filter?: IFilter) => Promise<void> = async (
    filter?: IFilter
  ): Promise<void> => {
    try {
      setResults([]);
      setError(false);
      setLoading(true);

      const content: ICharacterContent = await api.getCharacters(1, {
        query: filter?.query || (localStorage.getItem('queryValue') as ICharacterFilter) || 'name',
        value: filter?.value || localStorage.getItem('searchValue') || '',
      });
      // setInfo(content.info); — for future functionality
      setResults(content.results);

      setLoading(false);
    } catch (error: unknown) {
      setError(true);
      setLoading(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const fetchDataForModal: () => void = async (): Promise<void> => {
    try {
      setError(false);
      setLoading(true);

      setLocations((await api.getDataForModal(LOCATIONS)) as ILocation[]);
      setEpisodes((await api.getDataForModal(EPISODES)) as IEpisode[]);
      setBtnModalDisabled(false);

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect((): void => {
    fetchCharacters();
    fetchDataForModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fillModal: (id: number) => void = (id: number): void => {
    setLocationModal({
      name: '',
      type: '',
      dimension: '',
    });
    setEpisodesModal([{ name: '', air_date: '', episode: '' }]);

    const character: ICharacter | undefined = results.find(
      (character: ICharacter): boolean => character.id == id
    );
    if (!character) {
      return;
    }

    const { name, location: locationOfChar, episode: episodesOfChar } = character;
    setNameModal(name);

    const currentLocation: ILocation | undefined = locations.find(
      (item: ILocation): boolean => locationOfChar.url == item.url
    );
    if (currentLocation) {
      setLocationModal({
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
        setEpisodesModal(
          (prevState: IDataForModal['episodesModal']): IDataForModal['episodesModal'] => {
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
    <div className="flex flex-col">
      <SearchBar search={fetchCharacters} />
      <div className="flex flex-wrap mx-auto items-center justify-center">
        {loading && <LoadIndicator />}
        {error && <ErrorIndicator />}
        {results.map(
          (character: ICharacter): JSX.Element => (
            <Card
              character={character}
              key={character.id}
              isButtonDisabled={btnModalDisabled}
              fillModal={fillModal}
            />
          )
        )}
      </div>
      <Modal locationModal={locationModal} episodesModal={episodesModal} nameModal={nameModal} />
    </div>
  );
};
