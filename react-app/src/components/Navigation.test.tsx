import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';

const NAVIGATION: JSX.Element = (
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>
);

describe('Navigation component', () => {
  it('renders Navigation component', async () => {
    render(NAVIGATION);
    const linkElement: HTMLElement = screen.getByText(/React App/i);
    expect(linkElement).toBeInTheDocument();
  });
  it('has menu elements', async () => {
    render(NAVIGATION);
    const listElements: HTMLElement[] = screen.getAllByRole('listitem');
    listElements.forEach((item) => expect(item).toBeInTheDocument());
  });
});
