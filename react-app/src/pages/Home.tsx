import Card from 'components/UI/Card';
import SearchBar from 'components/UI/SearchBar';
import { characters } from 'data/characters';
import { ICharacter } from 'types/models';
import React, { Component } from 'react';

export default class Home extends Component {
  render(): JSX.Element {
    return (
      <div className="flex flex-col">
        {/* SearchBar */}
        <SearchBar />
        <div className="flex flex-wrap mx-auto items-center justify-center">
          {characters.map(
            (character: ICharacter): JSX.Element => (
              <Card character={character} key={character.id} />
            )
          )}
        </div>
      </div>
    );
  }
}
