import Card from 'components/UI/Card';
import SearchBar from 'components/UI/SearchBar';
import {
  ICharacter,
  ICharacterContent,
  ICharacterFilter,
  IFilter,
  IPageIndicators,
} from 'types/models';
import React, { Component } from 'react';
import Api from 'api/api';
import LoadIndicator from 'components/UI/Indicators/Load';
import ErrorIndicator from 'components/UI/Indicators/Error';

type MyProps = Record<string, never>;

type MyState = ICharacterContent & IPageIndicators;

export default class Home extends Component<MyProps, MyState> {
  api: Api;
  constructor(props: MyProps) {
    super(props);
    this.api = new Api();

    this.state = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
      error: false,
      loading: false,
    };

    this.fetchCharacters = this.fetchCharacters.bind(this);
  }

  async fetchCharacters(filter?: IFilter): Promise<void> {
    try {
      this.setState({ results: [] });
      this.setState({ error: false });
      this.setState({ loading: true });

      const content: ICharacterContent = await this.api.getCharacters(1, {
        query: filter?.query || (localStorage.getItem('queryValue') as ICharacterFilter) || 'name',
        value: filter?.value || localStorage.getItem('searchValue') || '',
      });
      this.setState({ ...content });

      this.setState({ loading: false });
    } catch (error: unknown) {
      this.setState({ error: true });
      this.setState({ loading: false });
      console.error(error);
    }
  }

  async componentDidMount(): Promise<void> {
    await this.fetchCharacters();
  }

  render(): JSX.Element {
    return (
      <div className="flex flex-col">
        <SearchBar search={this.fetchCharacters.bind(this)} />
        <div className="flex flex-wrap mx-auto items-center justify-center">
          {this.state.loading && <LoadIndicator />}
          {this.state.error && <ErrorIndicator />}
          {this.state.results.map(
            (character: ICharacter): JSX.Element => (
              <Card character={character} key={character.id} />
            )
          )}
        </div>
      </div>
    );
  }
}
