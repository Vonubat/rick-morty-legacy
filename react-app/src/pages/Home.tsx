import { Card } from 'components/Card';
import { SearchBar } from 'components/SearchBar';
import { ICharacter, StatusType } from 'types/models';
import React from 'react';
import { LoadIndicator } from 'components/UI/Indicators/Load';
import { ErrorIndicator } from 'components/UI/Indicators/Error';
import { Pagination } from 'components/Pagination';
import { useAppSelector } from 'hooks/hooks';
import { selectAdditionalData } from 'store/reducers/additionalDataSlice';
import { selectResults, selectCharactersStatus } from 'store/reducers/characterContentSlice';

export const Home: () => JSX.Element = (): JSX.Element => {
  const results: ICharacter[] = useAppSelector(selectResults);

  const charactersStatus: StatusType = useAppSelector(selectCharactersStatus);
  const isError: boolean = charactersStatus === 'failed';
  const isLoading: boolean = charactersStatus === 'loading';

  const { episodesStatus, locationsStatus } = useAppSelector(selectAdditionalData);
  const isCharacterPageReady: boolean =
    episodesStatus === 'succeeded' && locationsStatus === 'succeeded';

  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="flex flex-wrap mx-auto items-center justify-center">
        {isLoading && <LoadIndicator />}
        {isError && <ErrorIndicator />}
        {results.map(
          (character: ICharacter): JSX.Element => (
            <Card
              character={character}
              key={character.id}
              isButtonDisabled={!isCharacterPageReady}
            />
          )
        )}
      </div>
      <Pagination />
    </div>
  );
};
