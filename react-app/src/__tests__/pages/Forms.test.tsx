import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { IUserCharacter } from 'types/models';
import Forms from 'pages/Forms';

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

    const fakeFileImg: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const fakeFilePdf: File = new File(['pdfFile'], 'chucknorris.pdf', { type: 'application/pdf' });
    const submitBtn: HTMLButtonElement = screen.getByText(/submit/i);

    const fileInput: HTMLInputElement = screen.getByLabelText('Choose avatar for your character');
    const nameInput: HTMLInputElement = screen.getByPlaceholderText(/name/i);
    const statusSelect: HTMLSelectElement = screen.getByPlaceholderText(/select status/i);
    const speciesInput: HTMLInputElement = screen.getByPlaceholderText(/species/i);
    const genderSelect: HTMLSelectElement = screen.getByPlaceholderText(/select gender/i);
    const dateInput: HTMLInputElement = screen.getByPlaceholderText(/select a date/i);
    const checkbox: HTMLInputElement = screen.getByTestId(/checkbox/i);

    const fileValidationWarning: HTMLParagraphElement = screen.getByText(
      /Please, choose avatar for your character/i
    );
    const nameValidationWarning: HTMLParagraphElement = screen.getByText(
      /Name of your character should contains at least 3 chars/i
    );
    const speciesValidationWarning: HTMLParagraphElement = screen.getByText(
      /Species of your character should contains at least 3 chars/i
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

    await user.upload(fileInput, fakeFileImg);
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

    /* Check non-image file validation */
    await user.click(submitBtn);
    fileInput.accept = ''; // turn-off accept="image/png, image/gif, image/jpeg" in fileInput
    await user.upload(fileInput, fakeFilePdf);
    await user.click(submitBtn);
    expect(screen.getByText(/Please upload only jpg, png, jpeg, gif files!/i)).toBeInTheDocument();
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

    await waitFor(
      () => {
        expect(alert).toHaveClass('hidden');
      },
      { timeout: 4000 }
    );

    /* Check creation user card and reset forms elements to default state*/
    expect(screen.queryAllByTestId(/card/i)).toHaveLength(1);
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
    expect(screen.queryAllByTestId(/card/i)).toHaveLength(2);
  });
});
