import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const APP: JSX.Element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('App component', () => {
  it('renders App component', async () => {
    render(APP);
    const linkElement: HTMLElement = screen.getByText(/React App/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('events', () => {
  it('checkbox click', () => {
    const handleChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={handleChange} />);
    const checkbox = container.firstChild as ChildNode;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('input focus', () => {
    const { getByTestId } = render(<input type="text" data-testid="simple-input" />);
    const input = getByTestId('simple-input');
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});

// it('renders App component', async () => {
//   render(APP_WITH_ROUTING);
//   const searchBox = (await screen.findByPlaceholderText('Search')) as HTMLInputElement;
//   expect(searchBox.value).toBe('');
//   // fireEvent.change(screen.getByRole('searchbox'), {
//   //   target: { value: 'test_egor_1' },
//   // });
//   userEvent.type(screen.getByRole('searchbox'), 'test_egor_1');
//   expect(searchBox.value).toBe('test_egor_1');
// });
