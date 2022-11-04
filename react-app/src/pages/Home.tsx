import { Card } from 'components/Card';
import { SearchBar } from 'components/SearchBar';
import { ICharacter } from 'types/models';
import React from 'react';
import { LoadIndicator } from 'components/UI/Indicators/Load';
import { ErrorIndicator } from 'components/UI/Indicators/Error';
import { useHomeContextState, useHomeContextUpdater } from 'context/HomeContext';
import { Pagination } from 'components/Pagination';
import { useAppSelector } from 'hooks/hooks';
import { selectAdditionalData } from 'store/reducers/additionalDataSlice';

export const Home: () => JSX.Element = (): JSX.Element => {
  const { isError, isLoading, results } = useHomeContextState();
  const { fetchCharacters, fillCharacterPage } = useHomeContextUpdater();
  const { episodesStatus, locationsStatus } = useAppSelector(selectAdditionalData);
  const isCharacterPageReady: boolean =
    episodesStatus === 'succeeded' && locationsStatus === 'succeeded';

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
              fillCharacterPage={fillCharacterPage}
            />
          )
        )}
      </div>
      <Pagination />
    </div>
  );
};
