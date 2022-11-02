import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';

describe('SearchBar component', () => {
  it('renders SearchBar component', () => {
    render(<SearchBar />);
    const linkElement: HTMLElement = screen.getByRole('searchbox');
    expect(linkElement).toBeInTheDocument();
  });

  it('typing in SearchBar works', async () => {
    render(<SearchBar />);
    expect(screen.queryByDisplayValue('test_string')).toBeNull();
    await userEvent.type(screen.getByRole('searchbox'), 'test_string');
    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();
  });

  it('case: Input value should be saved to LocalStorage during component’s unmount. During the initialization pick the value from LocalStorage and show it.', async () => {
    window.localStorage.clear();
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.queryByDisplayValue('test_string')).toBeNull();
    await userEvent.type(screen.getByRole('searchbox'), 'test_string');
    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getAllByText(/about/i)[0]);
    await user.click(screen.getAllByText(/home/i)[0]);
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
