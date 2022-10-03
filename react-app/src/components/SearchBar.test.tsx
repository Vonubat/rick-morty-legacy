import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar component', () => {
  it('renders SearchBar component', async () => {
    render(<SearchBar />);
    const linkElement: HTMLElement = screen.getByRole('searchbox');
    expect(linkElement).toBeInTheDocument();
  });

  it('typing in SearchBar works', async () => {
    render(<SearchBar />);
    expect(screen.queryByDisplayValue('test_string')).toBeNull();
    userEvent.type(screen.getByRole('searchbox'), 'test_string');
    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();
  });

  /*  it('search filter is working', async () => {
    render(SEARCHBAR);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    userEvent.type(screen.getByRole('searchbox'), 'Rick');
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeNull();
  }); */
});
