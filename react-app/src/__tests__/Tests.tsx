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
import { ICharacter, IUserCharacter } from 'types/models';
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

  it('check filling form elements & reset btn functionality', async (): Promise<void> => {
    render(<Forms />);

    const resetBtn: HTMLButtonElement = screen.getByText(/reset/i);
    const nameInput: HTMLInputElement = screen.getByPlaceholderText(/name/i);
    const statusSelect: HTMLSelectElement = screen.getByPlaceholderText(/select status/i);
    const speciesInput: HTMLInputElement = screen.getByPlaceholderText(/species/i);
    const genderSelect: HTMLSelectElement = screen.getByPlaceholderText(/select gender/i);
    const dateInput: HTMLInputElement = screen.getByPlaceholderText(/select a date/i);
    const checkbox: HTMLInputElement = screen.getByTestId(/checkbox/i);

    await user.type(nameInput, 'test_name');
    await user.type(speciesInput, 'test_species');
    await user.type(dateInput, '1999-12-31');
    await user.selectOptions(statusSelect, ['Alive']);
    await user.selectOptions(genderSelect, ['Female']);
    await user.click(checkbox);
    expect(nameInput.value).toMatch('test_name');
    expect(speciesInput.value).toMatch('test_species');
    expect(dateInput.value).toMatch('1999-12-31');
    expect(statusSelect.value).toMatch('Alive');
    expect(genderSelect.value).toMatch('Female');
    expect(checkbox.checked).toBeTruthy();

    await user.click(resetBtn);
    expect(nameInput.value).toMatch('');
    expect(speciesInput.value).toMatch('');
    expect(dateInput.value).toMatch('');
    expect(statusSelect.value).toMatch('');
    expect(genderSelect.value).toMatch('');
    expect(checkbox.checked).toBeFalsy();
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

  it('check name & species input restriction > 3 chars', async (): Promise<void> => {
    render(<Forms />);

    const submitBtn: HTMLButtonElement = screen.getByText(/submit/i);
    const resetBtn: HTMLButtonElement = screen.getByText(/reset/i);
    const nameInput: HTMLInputElement = screen.getByLabelText(/name/i);
    const speciesInput: HTMLInputElement = screen.getByPlaceholderText(/species/i);
    const nameValidationWarning: HTMLParagraphElement = screen.getByText(
      /Name of your character should contains at least 3 chars/i
    );
    const speciesValidationWarning: HTMLParagraphElement = screen.getByText(
      /Species of your character should contains at least 3 chars/i
    );
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');

    await user.type(nameInput, 'abc');
    await user.type(speciesInput, '123');
    await user.click(submitBtn);
    expect(nameValidationWarning).toHaveClass('text-red-700');
    expect(speciesValidationWarning).toHaveClass('text-red-700');

    await user.click(resetBtn);
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');

    await user.type(nameInput, 'abcd');
    await user.type(speciesInput, '1234');
    await user.click(submitBtn);
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).toBeDisabled();
  });

  it('check ValidationWarning functionality', async (): Promise<void> => {
    render(<Forms />);

    const fakeFile: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const submitBtn: HTMLButtonElement = screen.getByText(/submit/i);

    const fileInput: HTMLInputElement = screen.getByLabelText('Choose avatar for your character');
    const nameInput: HTMLInputElement = screen.getByPlaceholderText(/name/i);
    const statusSelect: HTMLSelectElement = screen.getByPlaceholderText(/select status/i);
    const speciesInput: HTMLInputElement = screen.getByPlaceholderText(/species/i);
    const genderSelect: HTMLSelectElement = screen.getByPlaceholderText(/select gender/i);
    const dateInput: HTMLInputElement = screen.getByPlaceholderText(/select a date/i);
    const checkbox: HTMLInputElement = screen.getByTestId(/checkbox/i);

    const nameValidationWarning: HTMLParagraphElement = screen.getByText(
      /Name of your character should contains at least 3 chars/i
    );
    const speciesValidationWarning: HTMLParagraphElement = screen.getByText(
      /Species of your character should contains at least 3 chars/i
    );
    const fileValidationWarning: HTMLParagraphElement = screen.getByText(
      /Please, choose avatar for your character/i
    );
    const statusValidationWarning: HTMLParagraphElement = screen.getByText(
      /Please, select status of your character/i
    );
    const genderValidationWarning: HTMLParagraphElement = screen.getByText(
      /Please, select gender of your character/i
    );
    const dateValidationWarning: HTMLParagraphElement = screen.getByText(/Please, choose a date/i);
    const checkboxValidationWarning: HTMLParagraphElement =
      screen.getByText(/Checkbox is required/i);
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');
    expect(fileValidationWarning).toHaveClass('text-transparent');
    expect(statusValidationWarning).toHaveClass('text-transparent');
    expect(genderValidationWarning).toHaveClass('text-transparent');
    expect(dateValidationWarning).toHaveClass('text-transparent');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');

    await user.click(checkbox);
    await user.click(submitBtn);
    expect(nameValidationWarning).toHaveClass('text-red-700');
    expect(speciesValidationWarning).toHaveClass('text-red-700');
    expect(fileValidationWarning).toHaveClass('text-red-700');
    expect(statusValidationWarning).toHaveClass('text-red-700');
    expect(genderValidationWarning).toHaveClass('text-red-700');
    expect(dateValidationWarning).toHaveClass('text-red-700');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).toBeDisabled();

    await user.type(nameInput, 'test_name');
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-red-700');
    expect(fileValidationWarning).toHaveClass('text-red-700');
    expect(statusValidationWarning).toHaveClass('text-red-700');
    expect(genderValidationWarning).toHaveClass('text-red-700');
    expect(dateValidationWarning).toHaveClass('text-red-700');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).toBeDisabled();

    await user.type(speciesInput, 'test_species');
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');
    expect(fileValidationWarning).toHaveClass('text-red-700');
    expect(statusValidationWarning).toHaveClass('text-red-700');
    expect(genderValidationWarning).toHaveClass('text-red-700');
    expect(dateValidationWarning).toHaveClass('text-red-700');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).toBeDisabled();

    await user.upload(fileInput, fakeFile);
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');
    expect(fileValidationWarning).toHaveClass('text-transparent');
    expect(statusValidationWarning).toHaveClass('text-red-700');
    expect(genderValidationWarning).toHaveClass('text-red-700');
    expect(dateValidationWarning).toHaveClass('text-red-700');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).toBeDisabled();

    await user.selectOptions(statusSelect, ['Alive']);
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');
    expect(fileValidationWarning).toHaveClass('text-transparent');
    expect(statusValidationWarning).toHaveClass('text-transparent');
    expect(genderValidationWarning).toHaveClass('text-red-700');
    expect(dateValidationWarning).toHaveClass('text-red-700');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).toBeDisabled();

    await user.selectOptions(genderSelect, ['Female']);
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');
    expect(fileValidationWarning).toHaveClass('text-transparent');
    expect(statusValidationWarning).toHaveClass('text-transparent');
    expect(genderValidationWarning).toHaveClass('text-transparent');
    expect(dateValidationWarning).toHaveClass('text-red-700');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).toBeDisabled();

    await user.type(dateInput, '1999-12-31');
    expect(nameValidationWarning).toHaveClass('text-transparent');
    expect(speciesValidationWarning).toHaveClass('text-transparent');
    expect(fileValidationWarning).toHaveClass('text-transparent');
    expect(statusValidationWarning).toHaveClass('text-transparent');
    expect(genderValidationWarning).toHaveClass('text-transparent');
    expect(dateValidationWarning).toHaveClass('text-transparent');
    expect(checkboxValidationWarning).toHaveClass('text-transparent');
    expect(submitBtn).not.toBeDisabled();
  });

  it('check User card creation functionality', async (): Promise<void> => {
    render(<Forms />);

    const fakeFile1: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const fakeFile2: File = new File(['Hello, world!'], 'hello world.png', { type: 'image/png' });

    const mockNewData: IUserCharacter[] = [
      {
        name: 'Character #1',
        status: 'Alive',
        species: 'Human',
        gender: 'Female',
        image: URL.createObjectURL(fakeFile1),
        created: '1999-12-31',
      },
      {
        name: 'Character #2',
        status: 'Dead',
        species: 'Alien',
        gender: 'Male',
        image: URL.createObjectURL(fakeFile2),
        created: '2010-01-15',
      },
    ];

    const alert: HTMLDivElement = screen.getByRole('alert');
    const submitBtn: HTMLButtonElement = screen.getByText(/submit/i);
    const fileInput: HTMLInputElement = screen.getByLabelText('Choose avatar for your character');
    const nameInput: HTMLInputElement = screen.getByPlaceholderText(/name/i);
    const statusSelect: HTMLSelectElement = screen.getByPlaceholderText(/select status/i);
    const speciesInput: HTMLInputElement = screen.getByPlaceholderText(/species/i);
    const genderSelect: HTMLSelectElement = screen.getByPlaceholderText(/select gender/i);
    const dateInput: HTMLInputElement = screen.getByPlaceholderText(/select a date/i);
    const checkbox: HTMLInputElement = screen.getByTestId(/checkbox/i);

    expect(alert).toHaveClass('hidden');
    expect(screen.queryAllByTestId('card')).toHaveLength(0);

    await user.upload(fileInput, fakeFile1);
    await user.type(nameInput, mockNewData[0].name);
    await user.type(speciesInput, mockNewData[0].species);
    await user.type(dateInput, mockNewData[0].created);
    await user.selectOptions(statusSelect, mockNewData[0].status);
    await user.selectOptions(genderSelect, mockNewData[0].gender);
    await user.click(checkbox);
    await user.click(submitBtn);

    /* Check condition that alert message is visible only around 3 seconds after submit and create user card */
    expect(alert).toHaveClass('block');
    await new Promise((resolve) =>
      setTimeout(() => resolve('wait 3 seconds + little reserve time'), 4000)
    );
    expect(alert).toHaveClass('hidden');

    /* Check creation user card and reset forms elements to default state*/
    expect(screen.queryAllByTestId('card')).toHaveLength(1);
    expect(fileInput.value).toMatch('');
    expect(nameInput.value).toMatch('');
    expect(speciesInput.value).toMatch('');
    expect(dateInput.value).toMatch('');
    expect(statusSelect.value).toMatch('');
    expect(genderSelect.value).toMatch('');
    expect(checkbox.checked).toBeFalsy();

    await user.upload(fileInput, fakeFile2);
    await user.type(nameInput, mockNewData[1].name);
    await user.type(speciesInput, mockNewData[1].species);
    await user.type(dateInput, mockNewData[1].created);
    await user.selectOptions(statusSelect, mockNewData[1].status);
    await user.selectOptions(genderSelect, mockNewData[1].gender);
    await user.click(checkbox);
    await user.click(submitBtn);

    /* Check availability 2 user cards on page*/
    expect(screen.queryAllByTestId('card')).toHaveLength(2);
  });
});
