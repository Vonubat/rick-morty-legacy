import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from 'components/layout/Navigation';

describe('Navigation component', (): void => {
  it('renders Navigation component', (): void => {
    render(<Navigation />, { wrapper: BrowserRouter });

    const element: HTMLElement = screen.getByText(/Rick Morty Legacy/i);
    expect(element).toBeInTheDocument();
  });

  it('has menu elements', (): void => {
    render(<Navigation />, { wrapper: BrowserRouter });

    const listElements: HTMLElement[] = screen.getAllByRole('listitem');
    listElements.forEach((item: HTMLElement): void => expect(item).toBeInTheDocument());
  });
});
