import React, { Component, ChangeEvent } from 'react';
import { ICharacterFilter, IFilter } from 'types/models';
import Select from './Forms/Select';

type MyProps = {
  search: (filter?: IFilter) => Promise<void>;
};

type MyState = IFilter;

export default class SearchBar extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      query: (localStorage.getItem('queryValue') as ICharacterFilter) || 'name',
      value: localStorage.getItem('searchValue') || '',
    };

    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeSearchInput(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ value: e.target.value });
    localStorage.setItem('searchValue', e.target.value);
  }

  onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({ query: e.target.value as ICharacterFilter });
    localStorage.setItem('queryValue', e.target.value);
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const { value, query } = this.state;
    await this.props.search({ query, value });
  }

  render(): JSX.Element {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex justify-center gap-1 items-center flex-wrap-reverse"
      >
        {/* Select search query*/}
        <Select
          valid={true}
          subject="Select search query:"
          name="searchQuery"
          options={['name', 'status', 'species', 'type', 'gender']}
          defaultValue={this.state.query}
          onChange={this.onChangeSelect.bind(this)}
          warningMessage={''}
        />
        {/* SearchBar */}
        <div className="w-72 sm:w-96 mt-3">
          <div className="input-group relative flex flex-wrap items-stretch w-full rounded">
            <input
              value={this.state.value}
              onChange={this.onChangeSearchInput}
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="submit"
              id="button-addon2"
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
      </form>
    );
  }
}
