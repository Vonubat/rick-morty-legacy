import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import Home from 'pages/Home';

describe('Home page', (): void => {
  const user: UserEvent = userEvent.setup({ delay: 5000 });

  it('renders Home page', async (): Promise<void> => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('modal windows functionality', async (): Promise<void> => {
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    const rickCard = await screen.findByTestId('card Rick Sanchez');
    const rickModalBtn = within(rickCard).getByText('Tell me more!');
    await user.click(rickModalBtn);
    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    screen.debug();
  });
});
