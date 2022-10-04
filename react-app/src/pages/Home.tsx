import Card from 'components/UI/Card';
import SearchBar from 'components/UI/SearchBar';
import { characters } from 'data/characters';
import { ICharacterSchema } from 'models';
import React, { Component } from 'react';

export default class Home extends Component {
  render(): JSX.Element {
    return (
      <div className="flex flex-col">
        {/* SearchBar */}
        <SearchBar />
        <div className="flex flex-wrap mx-auto items-center justify-center">
          {characters.map((character: ICharacterSchema) => (
            <Card character={character} key={character.id} />
          ))}
        </div>
      </div>
    );
  }
}
