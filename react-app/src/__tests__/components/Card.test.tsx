import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from 'components/Card';
import { characters } from '__mocks__/characters';
import { ICharacter } from 'types/models';

describe('Card component', (): void => {
  it('renders Card component', (): void => {
    render(<Card isButtonDisabled={false} character={characters.results[0]} />);

    const img: HTMLElement = screen.getByRole('img');
    const heading: HTMLElement = screen.getByRole('heading');
    const button: HTMLElement = screen.getByRole('button');
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders all cards from data', (): void => {
    characters.results.forEach((character: ICharacter): void => {
      render(<Card isButtonDisabled={false} character={character} />);
    });

    const arrayOfCards: HTMLElement[] = screen.getAllByTestId('card');
    expect(arrayOfCards).toHaveLength(characters.results.length);
  });
});
