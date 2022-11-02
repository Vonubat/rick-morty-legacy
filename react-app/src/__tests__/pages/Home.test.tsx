import React from 'react';
import { render, screen, waitFor } from '../../__mocks__/all-the-providers';
import { Home } from 'pages/Home';

describe('Home page', (): void => {
  it('renders Home page', async (): Promise<void> => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });
});
