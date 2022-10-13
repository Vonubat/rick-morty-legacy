import Card from 'components/UI/Card';
import SearchBar from 'components/UI/SearchBar';
import { ICharacter, ICharacterContent } from 'types/models';
import React, { Component } from 'react';
import Api from 'api/api';

type MyProps = Record<string, never>;

type MyState = ICharacterContent;

export default class Home extends Component<MyProps, MyState> {
  api: Api;
  constructor(props: MyProps) {
    super(props);
    this.api = new Api();

    this.state = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const content: ICharacterContent = await this.api.getCharacters();
    this.setState({ ...content });
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
