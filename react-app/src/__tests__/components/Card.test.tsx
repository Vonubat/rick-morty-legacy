import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from 'components/Card';
import { charactersAll } from '__mocks__/characters';
import { ICharacter } from 'types/models';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Card component', (): void => {
  const user: UserEvent = userEvent.setup();
  it('renders Card component', (): void => {
    render(<Card isButtonDisabled={false} character={charactersAll.results[0]} />);

    const img: HTMLElement = screen.getByRole('img');
    const heading: HTMLElement = screen.getByRole('heading');
    const button: HTMLElement = screen.getByRole('button');
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders all cards from data', (): void => {
    charactersAll.results.forEach((character: ICharacter): void => {
      render(<Card isButtonDisabled={false} character={character} />);
    });

    const arrayOfCards: HTMLElement[] = screen.getAllByTestId(/card/i);
    expect(arrayOfCards).toHaveLength(charactersAll.results.length);
  });

  it('check passed in to component callback', async (): Promise<void> => {
    const setModal = jest.fn();

    render(
      <Card isButtonDisabled={false} character={charactersAll.results[0]} fillModal={setModal} />
    );
    const button: HTMLElement = screen.getByRole('button');

    await user.click(button);
    expect(setModal).toBeCalledWith(1);
  });
});
