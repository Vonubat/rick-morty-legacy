import { ICharacter, IUserCharacter } from 'types/models';
import React, { Component } from 'react';
import Button from './UI/Button';

type MyProps = {
  character: ICharacter | IUserCharacter;
  isButtonDisabled: boolean;
  setModal?: (id: number) => void;
};

type MyState = {
  id: number;
};

export default class Card extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      id: (this.props.character as ICharacter).id || 1,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  character: ICharacter | IUserCharacter = this.props.character;
  date: Date = new Date(Date.parse(this.character.created));
  dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  formattedDate: string = this.date.toLocaleString('en-US', this.dateOptions);

  handleClick(): void {
    if (this.props.setModal) {
      this.props.setModal(this.state.id);
    }
  }

  render(): JSX.Element {
    return (
      <div className="flex justify-center mx-3 my-3" data-testid="card">
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-xs text-center">
          <img
            className="rounded-t-lg max-w-full h-auto"
            src={this.character.image}
            alt={this.character.name}
            loading="lazy"
          />
          <div className="p-5">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{this.character.name}</h5>
            <p className="text-gray-700 text-base mb-2 text-start">
              <i>The status:</i> <b>{this.character.status}</b>
            </p>
            <p className="text-gray-700 text-base mb-2 text-start">
              <i>The species:</i> <b>{this.character.species}</b>
            </p>
            <p className="text-gray-700 text-base mb-2 text-start">
              <i> The gender:</i> <b>{this.character.gender}</b>
            </p>
            <Button
              disabled={this.props.isButtonDisabled}
              role="button"
              color="primary"
              dataBsToggle="modal"
              dataBsTarget="#modalCenteredScrollable"
              onClick={this.handleClick}
            >
              Tell me more!
            </Button>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            <div>Time at which the character was created in the database:</div>
            <b>{this.formattedDate}</b>
          </div>
        </div>
      </div>
    );
  }
}
