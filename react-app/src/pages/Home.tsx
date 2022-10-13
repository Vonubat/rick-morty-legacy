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
import Select from 'components/UI/Forms/Select';

type MyProps = Record<string, never>;

type MyState = ICharacterContent & IPageIndicators & IFilter;

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
      query: 'name',
      value: localStorage.getItem('searchValue') || '',
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      this.setState({ error: false });
      this.setState({ loading: true });

      const content: ICharacterContent = await this.api.getCharacters(1, {
        query: this.state.query,
        value: this.state.value,
      });
      this.setState({ ...content });

      this.setState({ loading: false });
    } catch (error: unknown) {
      this.setState({ error: true });
      this.setState({ loading: false });
      console.error(error);
    }
  }

  onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({ query: e.target.value as ICharacterFilter });
  }

  render(): JSX.Element {
    return (
      <div className="flex flex-col">
        <div className="flex justify-center gap-1 items-center flex-wrap-reverse">
          {/* Select search query*/}
          <Select
            valid={true}
            subject="Select search query:"
            name="searchQuery"
            options={['name', 'status', 'species', 'type', 'gender']}
            defaultValue="name"
            onChange={this.onChangeSelect.bind(this)}
            warningMessage={''}
          />
          {/* SearchBar */}
          <SearchBar />
        </div>

        <div className="flex flex-wrap mx-auto items-center justify-center">
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
