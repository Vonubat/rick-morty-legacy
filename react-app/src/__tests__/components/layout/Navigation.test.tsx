import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from 'components/layout/Header';

describe('Header component', (): void => {
  it('renders Header component', (): void => {
    render(<Header />, { wrapper: BrowserRouter });

    const element: HTMLElement = screen.getByText(/Rick Morty Legacy/i);
    expect(element).toBeInTheDocument();
  });

  it('has menu elements', (): void => {
    render(<Header />, { wrapper: BrowserRouter });

    const listElements: HTMLElement[] = screen.getAllByRole('listitem');
    listElements.forEach((item: HTMLElement): void => expect(item).toBeInTheDocument());
  });
});
