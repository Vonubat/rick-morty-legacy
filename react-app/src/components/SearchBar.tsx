import React, { ChangeEvent, useState } from 'react';
import settingsIcon from 'assets/settings.png';
import { Settings } from './Settings';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { selectPage, setPage } from 'store/reducers/pageSlice';
import { useFormsContextState } from 'context/FormsContext';
import { fetchCharacters } from 'store/reducers/characterContentSlice';

export const SearchBar: () => JSX.Element = (): JSX.Element => {
  const [value, setValue] = useState(localStorage.getItem('searchValue') || '');
  const { searchBarForm: form } = useFormsContextState();
  const { handleSubmit, register, getValues } = form;
  const currentPage: number = useAppSelector(selectPage);
  const dispatch = useAppDispatch();

  const onFormSubmit: () => void = (): void => {
    if (currentPage === 1) {
      dispatch(
        fetchCharacters({
          query: getValues('search query'),
          gender: getValues('gender'),
          status: getValues('status'),
        })
      );
    }
    dispatch(setPage(1));
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex justify-center items-center flex-wrap-reverse"
    >
      {/* Settings */}
      <img
        src={settingsIcon}
        alt="settingsIcon"
        className="w-10 mt-3 mr-3 hover:animate-spin hover:cursor-pointer block"
        data-bs-toggle="modal"
        data-bs-target="#settings"
      />
      {/* SearchBar */}
      <div className="w-72 sm:w-96 mt-3">
        <div className="input-group relative flex flex-wrap items-stretch w-full rounded">
          <input
            {...register('value', {
              value: value,
              onChange: (e: ChangeEvent<HTMLInputElement>): void => {
                setValue(e.target.value);
                localStorage.setItem('searchValue', e.target.value);
              },
            })}
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search..."
            aria-label="Search"
          />
          <button
            className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="submit"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <Settings />
    </form>
  );
};
