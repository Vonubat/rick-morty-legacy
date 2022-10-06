import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setLocalStorage } from 'setupTests';

describe('App component', () => {
  it('renders App component', () => {
    render(<App />, { wrapper: BrowserRouter });
    const linkElement: HTMLElement = screen.getByText(/React App/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('Router', () => {
  it('full app rendering/navigating', async () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    // verify page content for default route
    expect(screen.getByRole('searchbox')).toBeInTheDocument();

    // verify page content for expected route after navigating
    await user.click(screen.getAllByText(/about/i)[0]);
    expect(
      screen.getByText(
        /This application will give you access to about hundreds of characters, images, locations and episodes. Is filled with canonical information as seen on the TV show/i
      )
    ).toBeInTheDocument();
  });

  it('landing on a bad page', () => {
    const badRoute = '/some/bad/route';

    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    // verify navigation to "no match" route
    expect(screen.getByText(/GET ME HOME/i)).toBeInTheDocument();
  });
});

describe('LocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('data is added into local storage', () => {
    const mockId = '1';
    const mockJson = { data: 'json data' };
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  it('data in local storage which is overwritten', () => {
    const mockId = '222';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: ' new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockOldData));

    setLocalStorage(mockId, mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(mockNewData));
  });

  it('only one ID is in localStorage', () => {
    const mockId = '333';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: ' new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    setLocalStorage(mockId, mockNewData);

    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});
