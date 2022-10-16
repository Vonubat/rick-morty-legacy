import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchBar from 'components/SearchBar';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('SearchBar component', (): void => {
  const user: UserEvent = userEvent.setup();

  it('renders SearchBar component', (): void => {
    render(<SearchBar search={jest.fn()} />);

    const element: HTMLElement = screen.getByRole('searchbox');
    expect(element).toBeInTheDocument();
  });

  it('typing in SearchBar works', async (): Promise<void> => {
    render(<SearchBar search={jest.fn()} />);

    expect(screen.queryByDisplayValue('test_string')).toBeNull();

    await user.type(screen.getByRole('searchbox'), 'test_string');
    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();
  });

  it('case: Input value should be saved to LocalStorage during component’s unmount. During the initialization pick the value from LocalStorage and show it.', async (): Promise<void> => {
    window.localStorage.clear();
    render(<App />, { wrapper: BrowserRouter });

    await user.click(screen.getAllByText(/home/i)[0]);
    expect(screen.queryByDisplayValue('test_string')).toBeNull();

    await userEvent.type(screen.getByRole('searchbox'), 'test_string');
    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();

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
