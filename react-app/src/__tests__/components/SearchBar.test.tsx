import React from 'react';
import { render, screen, waitFor } from '../../__mocks__/all-the-providers';
import App from 'App';
import userEvent from '@testing-library/user-event';
import { SearchBar } from 'components/SearchBar';
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

  it('case: Input value and select value should be saved to LocalStorage during component’s unmount. During the initialization pick the value from LocalStorage and show it.', async (): Promise<void> => {
    window.localStorage.clear();
    const { getByTestId, getByRole, queryByDisplayValue, getAllByText } = render(<App />);

    const select: HTMLElement = getByTestId('select');
    const optionName: HTMLOptionElement = getByRole('option', {
      name: 'name',
    }) as HTMLOptionElement;
    const optionSpecies: HTMLOptionElement = getByRole('option', {
      name: 'species',
    }) as HTMLOptionElement;
    const searchbox: HTMLElement = getByRole('searchbox');

    await user.click(getAllByText(/home/i)[0]);
    expect(queryByDisplayValue('test_string')).toBeNull();
    expect(optionName.selected).toBe(true);

    await user.type(searchbox, 'test_string');
    await user.selectOptions(select, optionSpecies);
    expect(queryByDisplayValue('test_string')).toBeInTheDocument();
    expect(optionSpecies.selected).toBe(true);

    await user.click(getAllByText(/about/i)[0]);
    await user.click(getAllByText(/home/i)[0]);
    expect(queryByDisplayValue('test_string')).toBeInTheDocument();
    expect(optionSpecies.selected).toBe(true);
  });

  it('search filter is working', async (): Promise<void> => {
    window.localStorage.clear();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    await user.type(screen.getByRole('searchbox'), 'Rick Sanchez');
    await user.keyboard('[Enter]');

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument();
    });
  });
});
