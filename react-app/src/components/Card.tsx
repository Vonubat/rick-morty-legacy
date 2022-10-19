import { ICharacter, IUserCharacter } from 'types/models';
import React from 'react';
import { Button } from './UI/Button';

type MyProps = {
  character: ICharacter | IUserCharacter;
  isButtonDisabled: boolean;
  setModal?: (id: number) => void;
};

export const Card: ({ character, isButtonDisabled, setModal }: MyProps) => JSX.Element = ({
  character,
  isButtonDisabled,
  setModal,
}: MyProps): JSX.Element => {
  const id: number = (character as ICharacter).id || 1;
  const date: Date = new Date(Date.parse(character.created));
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate: string = date.toLocaleString('en-US', dateOptions);

  const handleClick: () => void = (): void => {
    if (setModal) {
      setModal(id);
    }
    return;
  };

  return (
    <div className="flex justify-center mx-3 my-3" data-testid={`card ${character.name}`}>
      <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-xs text-center">
        <img
          className="rounded-t-lg max-w-full h-auto"
          src={character.image}
          alt={character.name}
          loading="lazy"
        />
        <div className="p-5">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{character.name}</h5>
          <p className="text-gray-700 text-base mb-2 text-start">
            <i>The status:</i> <b>{character.status}</b>
          </p>
          <p className="text-gray-700 text-base mb-2 text-start">
            <i>The species:</i> <b>{character.species}</b>
          </p>
          <p className="text-gray-700 text-base mb-2 text-start">
            <i> The gender:</i> <b>{character.gender}</b>
          </p>
          <Button
            role="button"
            color="primary"
            disabled={isButtonDisabled}
            onClick={handleClick}
            dataBsToggle="modal"
            dataBsTarget="#modalCenteredScrollable"
          >
            Tell me more!
          </Button>
        </div>
        <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
          <div>Time at which the character was created in the database:</div>
          <b>{formattedDate}</b>
        </div>
      </div>
    </div>
  );
};
