import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Error indicator component', (): void => {
  const user: UserEvent = userEvent.setup();

  it(`renders Error indicator component in case when couldn't find search query`, async (): Promise<void> => {
    window.localStorage.clear();
    render(<App />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    await user.type(screen.getByRole('searchbox'), 'John doe');
    await user.keyboard('[Enter]');

    expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
    expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument();
    expect(await screen.findByText('Nobody exists on purpose.')).toBeInTheDocument();
    expect(await screen.findByText('Nobody belongs anywhere.')).toBeInTheDocument();
    expect(await screen.findByText(`Nobody couldn't find you search query.`)).toBeInTheDocument();
  });
});
