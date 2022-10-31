import React from 'react';
import { render, screen } from '@testing-library/react';
import { characters } from './../data/characters';
import Card from './Card';

describe('Card component', () => {
  it('renders Card component', () => {
    render(<Card character={characters[0]} />);
    const img: HTMLElement = screen.getByRole('img');
    const heading: HTMLElement = screen.getByRole('heading');
    const button: HTMLElement = screen.getByRole('button');
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders all cards from data', () => {
    characters.forEach((character) => {
      render(<Card character={character} />);
    });

    const arrayOfCards: HTMLElement[] = screen.getAllByTestId('card');
    expect(arrayOfCards).toHaveLength(characters.length);
  });
});
