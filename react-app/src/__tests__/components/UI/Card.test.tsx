import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from 'components/UI/Card';
import { charactersAll } from '__mocks__/characters';
import { ICharacter } from 'types/models';

describe('Card component', (): void => {
  it('renders Card component', (): void => {
    render(<Card character={charactersAll.results[0]} />);

    const img: HTMLElement = screen.getByRole('img');
    const heading: HTMLElement = screen.getByRole('heading');
    const button: HTMLElement = screen.getByRole('button');
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders all cards from data', (): void => {
    charactersAll.results.forEach((character: ICharacter): void => {
      render(<Card character={character} />);
    });

    const arrayOfCards: HTMLElement[] = screen.getAllByTestId(/card/i);
    expect(arrayOfCards).toHaveLength(charactersAll.results.length);
  });
});
