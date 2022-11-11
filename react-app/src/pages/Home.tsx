import { Card } from 'components/Card';
import { SearchBar } from 'components/SearchBar';
import { ICharacter, StatusType } from 'types/models';
import React, { useEffect } from 'react';
import { LoadIndicator } from 'components/UI/Indicators/Load';
import { ErrorIndicator } from 'components/UI/Indicators/Error';
import { Pagination } from 'components/Pagination';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  fetchEpisodes,
  fetchLocations,
  selectAdditionalData,
} from 'store/reducers/additionalDataSlice';
import {
  selectResults,
  selectCharactersStatus,
  fetchCharacters,
} from 'store/reducers/characterContentSlice';
import { selectPage } from 'store/reducers/pageSlice';
import { useFormsContextState } from 'context/FormsContext';

export const Home: () => JSX.Element = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { searchBarForm: form } = useFormsContextState();
  const { getValues } = form;

  const currentPage: number = useAppSelector(selectPage);
  const results: ICharacter[] = useAppSelector(selectResults);

  const charactersStatus: StatusType = useAppSelector(selectCharactersStatus);
  const { episodesStatus, locationsStatus } = useAppSelector(selectAdditionalData);
  const isError: boolean = charactersStatus === 'failed';
  const isLoading: boolean = charactersStatus === 'loading';
  const isCharacterPageReady: boolean =
    episodesStatus === 'succeeded' && locationsStatus === 'succeeded';

  useEffect((): void => {
    if (episodesStatus === 'idle') {
      dispatch(fetchEpisodes());
    }
    if (locationsStatus === 'idle') {
      dispatch(fetchLocations());
    }
  }, [episodesStatus, locationsStatus, dispatch]);

  useEffect((): void => {
    dispatch(
      fetchCharacters({
        query: getValues('search query'),
        gender: getValues('gender'),
        status: getValues('status'),
      })
    );
  }, [currentPage, getValues, dispatch]);

  return (
    <div className="flex flex-col flex-1">
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
