import Card from 'components/UI/Card';
import SearchBar from 'components/UI/SearchBar';
import { ICharacter, ICharacterContent, IPageIndicators } from 'types/models';
import React, { Component } from 'react';
import Api from 'api/api';

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
  }

  async componentDidMount(): Promise<void> {
    try {
      this.setState({ error: false });
      this.setState({ loading: true });

      const content: ICharacterContent = await this.api.getCharacters(1, {
        query: 'name',
        value: 'Morty',
      });
      this.setState({ ...content });

      this.setState({ loading: false });
      // console.log(this.state);
    } catch (error: unknown) {
      this.setState({ error: true });
      this.setState({ loading: false });
      console.error(error);
    }
  }

  render(): JSX.Element {
    return (
      <div className="flex flex-col">
        {/* SearchBar */}
        <SearchBar />
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
