import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Application root', (): void => {
  it('renders App component', (): void => {
    const { getByText } = render(<App />, { wrapper: BrowserRouter });

    const element: HTMLElement = getByText(/Rick Morty Legacy/i);
    expect(element).toBeInTheDocument();
  });
});
