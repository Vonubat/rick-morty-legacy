import React from 'react';
import { render } from '../__mocks__/all-the-providers';
import App from '../App';

describe('Application root', (): void => {
  it('renders App component', (): void => {
    const { getByText } = render(<App />);

    const element: HTMLElement = getByText(/Rick Morty Legacy/i);
    expect(element).toBeInTheDocument();
  });
});
