import { Card } from 'components/Card';
import { SearchBar } from 'components/SearchBar';
import { ICharacter, IAdditionalData, IEpisode, ILocation } from 'types/models';
import React, { useState } from 'react';
import { LoadIndicator } from 'components/UI/Indicators/Load';
import { ErrorIndicator } from 'components/UI/Indicators/Error';
import { Modal } from 'components/Modal';
import { useHomeContextState, useHomeContextUpdater } from 'context/HomeContext';

export const Home: () => JSX.Element = (): JSX.Element => {
  const { isError, isLoading, results, locations, episodes, isCharacterPageReady } =
    useHomeContextState();
  const { fetchCharacters } = useHomeContextUpdater();

  const [characterName, setCharacterName] = useState<IAdditionalData['characterName']>('');
  const [locationCharacter, setLocationCharacter] = useState<IAdditionalData['locationCharacter']>({
    name: '',
    type: '',
    dimension: '',
  });
  const [episodesCharacter, setEpisodesCharacter] = useState<IAdditionalData['episodesCharacter']>([
    { name: '', air_date: '', episode: '' },
  ]);

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

    const { name, location: locationOfChar, episode: episodesOfChar } = character;
    setCharacterName(name);

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
    <div className="flex flex-col">
      <SearchBar search={fetchCharacters} />
      <div className="flex flex-wrap mx-auto items-center justify-center">
        {isLoading && <LoadIndicator />}
        {isError && <ErrorIndicator />}
        {results.map(
          (character: ICharacter): JSX.Element => (
            <Card
              character={character}
              key={character.id}
              isButtonDisabled={!isCharacterPageReady}
              fillModal={fillCharacterPage}
            />
          )
        )}
      </div>
      <Modal
        locationCharacter={locationCharacter}
        episodesCharacter={episodesCharacter}
        characterName={characterName}
      />
    </div>
  );
};
