import Card from 'components/Card';
import { characters } from 'data/characters';
import { ICharacterSchema } from 'models';
import React, { Component } from 'react';

export default class Home extends Component {
  render(): JSX.Element {
    return (
      <div className="flex flex-wrap mx-auto justify-center">
        {characters.map((character: ICharacterSchema) => (
          <Card character={character} key={character.id} />
        ))}
      </div>
    );
  }
}
