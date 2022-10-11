import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './../App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setLocalStorage } from 'setupTests';
import Navigation from 'components/layout/Navigation';
import Card from 'components/UI/Card';
import { characters } from 'data/characters';
import SearchBar from 'components/UI/SearchBar';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { ICharacter } from 'types/models';
import Forms from 'pages/Forms';

describe('App component', (): void => {
  it('renders App component', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    const element: HTMLElement = screen.getByText(/Rick Morty Legacy/i);
    expect(element).toBeInTheDocument();
  });
});

describe('Router', (): void => {
  const user: UserEvent = userEvent.setup();

  it('full app rendering/navigating', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });

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

  it('landing on a bad page', (): void => {
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

describe('LocalStorage', (): void => {
  beforeEach((): void => {
    window.localStorage.clear();
  });

  it('data is added into local storage', (): void => {
    const mockId = '1';
    const mockJson = { data: 'json data' };
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  it('data in local storage which is overwritten', (): void => {
    const mockId = '222';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: 'new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockOldData));

    setLocalStorage(mockId, mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(mockNewData));
  });

  it('only one ID is in localStorage', (): void => {
    const mockId = '333';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: 'new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    setLocalStorage(mockId, mockNewData);

    const allItems: {
      [index: string]: string;
    } = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});

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

describe('Card component', (): void => {
  it('renders Card component', (): void => {
    render(<Card character={characters[0]} />);
    const img: HTMLElement = screen.getByRole('img');
    const heading: HTMLElement = screen.getByRole('heading');
    const button: HTMLElement = screen.getByRole('button');
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders all cards from data', (): void => {
    characters.forEach((character: ICharacter): void => {
      render(<Card character={character} />);
    });

    const arrayOfCards: HTMLElement[] = screen.getAllByTestId('card');
    expect(arrayOfCards).toHaveLength(characters.length);
  });
});

describe('SearchBar component', (): void => {
  const user: UserEvent = userEvent.setup();

  it('renders SearchBar component', (): void => {
    render(<SearchBar />);
    const element: HTMLElement = screen.getByRole('searchbox');
    expect(element).toBeInTheDocument();
  });

  it('typing in SearchBar works', async (): Promise<void> => {
    render(<SearchBar />);

    expect(screen.queryByDisplayValue('test_string')).toBeNull();
    await user.type(screen.getByRole('searchbox'), 'test_string');
    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();
  });

  it('case: Input value should be saved to LocalStorage during component’s unmount. During the initialization pick the value from LocalStorage and show it.', async (): Promise<void> => {
    window.localStorage.clear();
    render(<App />, { wrapper: BrowserRouter });

    await user.click(screen.getAllByText(/home/i)[0]);

    expect(screen.queryByDisplayValue('test_string')).toBeNull();
    await userEvent.type(screen.getByRole('searchbox'), 'test_string');
    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();

    await user.click(screen.getAllByText(/about/i)[0]);
    await user.click(screen.getAllByText(/home/i)[0]);

    expect(screen.queryByDisplayValue('test_string')).toBeInTheDocument();
  });

  /*  it('search filter is working', async () => {
    render(SEARCHBAR);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    userEvent.type(screen.getByRole('searchbox'), 'Rick');
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeNull();
  }); */
});

describe('Forms page', (): void => {
  const user: UserEvent = userEvent.setup();

  it('renders Forms page', (): void => {
    render(<Forms />);
    const element: HTMLElement = screen.getByText('Character generator');
    expect(element).toBeInTheDocument();
  });

  it('renders all form elements', (): void => {
    render(<Forms />);

    const fileInputs: HTMLInputElement[] = screen.getAllByTestId('fileInput');
    const textInputs: HTMLInputElement[] = screen.getAllByTestId('textInput');
    const selects: HTMLSelectElement[] = screen.getAllByTestId('select');
    const dateInputs: HTMLInputElement[] = screen.getAllByTestId('dateInput');
    const checkboxes: HTMLInputElement[] = screen.getAllByTestId('checkbox');
    const btns: HTMLButtonElement[] = screen.getAllByRole('button');

    expect(fileInputs).toHaveLength(1);
    expect(textInputs).toHaveLength(2);
    expect(selects).toHaveLength(2);
    expect(dateInputs).toHaveLength(1);
    expect(checkboxes).toHaveLength(1);
    expect(btns).toHaveLength(2);
  });

  it('submit button disabled at initialization (before the first typing)', async (): Promise<void> => {
    render(<Forms />);

    const submitBtn: HTMLButtonElement = screen.getByText(/submit/i);
    const nameInput: HTMLInputElement = screen.getByPlaceholderText(/name/i);

    expect(submitBtn).toBeDisabled();
    await user.type(nameInput, 'test_string');
    expect(submitBtn).not.toBeDisabled();
  });

  it('check reset btn functionality', async (): Promise<void> => {
    render(<Forms />);

    const resetBtn: HTMLButtonElement = screen.getByText(/reset/i);
    const nameInput: HTMLInputElement = screen.getByPlaceholderText(/name/i);

    expect(submitBtn).toBeDisabled();
    await user.type(nameInput, 'test_string');
    expect(submitBtn).not.toBeDisabled();
  });

  it('upload file', async (): Promise<void> => {
    render(<Forms />);

    const fakeFile: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const fileInput: HTMLInputElement = screen.getByLabelText('Choose avatar for your character');

    await user.upload(fileInput, fakeFile);

    expect(fileInput.files![0]).toStrictEqual(fakeFile);
    expect(fileInput.files!.item(0)).toStrictEqual(fakeFile);
    expect(fileInput.files).toHaveLength(1);
  });

  it('filling name input', async (): Promise<void> => {
    render(<Forms />);
    const nameInput: HTMLInputElement = screen.getByLabelText(/name/i);
    let value: string = nameInput.value;

    expect(value).toMatch('');

    await user.type(nameInput, 'test_string');
    value = nameInput.value;

    expect(value).toMatch('test_string');
  });

  it('check name input restriction > 3 chars', async (): Promise<void> => {
    render(<Forms />);
    const nameInput: HTMLInputElement = screen.getByLabelText(/name/i);
    const submitBtn: HTMLButtonElement = screen.getByText(/submit/i);
    let value: string = nameInput.value;

    expect(value).toMatch('');

    await user.type(nameInput, 'abc');
    value = nameInput.value;

    expect(value).toMatch('test_string');
  });

  it('filling species input', async (): Promise<void> => {
    render(<Forms />);
    const nameInput: HTMLInputElement = screen.getByLabelText(/species/i);
    let value: string = nameInput.value;

    expect(value).toMatch('');

    await user.type(nameInput, 'test_string');
    value = nameInput.value;

    expect(value).toMatch('test_string');
  });
});
