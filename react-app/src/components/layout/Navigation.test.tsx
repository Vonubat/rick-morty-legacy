import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';

describe('Navigation component', () => {
  it('renders Navigation component', () => {
    render(<Navigation />, { wrapper: BrowserRouter });
    const linkElement: HTMLElement = screen.getByText(/Rick Morty Legacy/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('has menu elements', async () => {
    render(<Navigation />, { wrapper: BrowserRouter });
    const listElements: HTMLElement[] = screen.getAllByRole('listitem');
    listElements.forEach((item) => expect(item).toBeInTheDocument());
  });
});
