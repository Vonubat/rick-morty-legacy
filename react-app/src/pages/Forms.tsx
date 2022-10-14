import Select from '../components/UI/Forms/Select';
import TextInput from '../components/UI/Forms/TextInput';
import React, { Component, createRef } from 'react';
import formsImg from './../assets/forms-img.webp';
import Button from 'components/UI/Button';
import DateInput from 'components/UI/Forms/DateInput';
import Checkbox from 'components/UI/Forms/Checkbox';
import FileInput from 'components/UI/Forms/FileInput';
import { IUserCharacter } from 'types/models';
import Card from 'components/Card';
import Alert from 'components/UI/Alert';
import warningMessages from 'utils/warning-messages';

type MyProps = Record<string, never>;

type MyState = {
  firstChangeForm: boolean;
  alertIsVisible: boolean;
  buttonDisabled: boolean;
  extension: boolean;
  file: boolean;
  name: boolean;
  status: boolean;
  species: boolean;
  gender: boolean;
  date: boolean;
  checkbox: boolean;
  image: string | null;
};

export default class Forms extends Component<MyProps, MyState> {
  fileInput: React.RefObject<HTMLInputElement>;
  nameInput: React.RefObject<HTMLInputElement>;
  statusSelect: React.RefObject<HTMLSelectElement>;
  speciesInput: React.RefObject<HTMLInputElement>;
  genderSelect: React.RefObject<HTMLSelectElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  checkboxProcessing: React.RefObject<HTMLInputElement>;
  userCards: IUserCharacter[];
  validFileExtensions: string[];

  constructor(props: MyProps) {
    super(props);
    this.fileInput = createRef();
    this.nameInput = createRef();
    this.statusSelect = createRef();
    this.speciesInput = createRef();
    this.genderSelect = createRef();
    this.dateInput = createRef();
    this.checkboxProcessing = createRef();

    this.state = {
      firstChangeForm: false,
      alertIsVisible: false,
      buttonDisabled: true,
      extension: true,
      file: true,
      name: true,
      status: true,
      species: true,
      gender: true,
      date: true,
      checkbox: true,
      image: null,
    };

    this.userCards = [];
    this.validFileExtensions = ['image/png', 'image/jpeg', 'image/gif'];

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.resetStateInputs = this.resetStateInputs.bind(this);
  }

  onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void {
    const target: (EventTarget & HTMLInputElement) | (EventTarget & HTMLSelectElement) = e.target;
    const name: string = target.name;
    const avatar: HTMLInputElement | null = this.fileInput.current;

    if (name === 'file' && avatar?.files && avatar.files.length) {
      if (!this.validFileExtensions.includes(avatar.files[0].type)) {
        this.setState({ extension: false });
      } else {
        this.setState({ image: URL.createObjectURL(avatar.files[0]), file: true });
      }
    }

    this.setState((prevState: Readonly<MyState>) => {
      return { ...prevState, [name]: true };
    }, this.enableButton);

    if (!this.state.firstChangeForm) {
      this.setState({ buttonDisabled: false });
    }
  }

  enableButton(): void {
    if (
      this.state.firstChangeForm &&
      this.state.file &&
      this.state.name &&
      this.state.status &&
      this.state.species &&
      this.state.gender &&
      this.state.date &&
      this.state.checkbox
    ) {
      this.setState((prevState: Readonly<MyState>) => {
        return { ...prevState, buttonDisabled: false };
      });
    }
  }

  checkValidation(condition: boolean | string | null, name: string): boolean {
    if (!condition) {
      this.setState((prevState: Readonly<MyState>) => {
        return { ...prevState, [name]: false };
      });
      return false;
    } else {
      this.setState((prevState: Readonly<MyState>) => {
        return { ...prevState, [name]: true };
      });
      return true;
    }
  }

  validate(): boolean {
    const {
      nameElement,
      statusElement,
      speciesElement,
      genderElement,
      dateElement,
      checkboxElement,
    } = this.getFormElements() as {
      fileElement: HTMLInputElement;
      nameElement: HTMLInputElement;
      statusElement: HTMLSelectElement;
      speciesElement: HTMLInputElement;
      genderElement: HTMLSelectElement;
      dateElement: HTMLInputElement;
      checkboxElement: HTMLInputElement;
    };

    let isValid = true;

    isValid = this.checkValidation(this.state.image, 'file') && isValid;
    isValid = this.checkValidation(nameElement.value.trim().length > 3, 'name') && isValid;
    isValid = this.checkValidation(statusElement.value, 'status') && isValid;
    isValid = this.checkValidation(speciesElement.value.trim().length > 3, 'species') && isValid;
    isValid = this.checkValidation(genderElement.value, 'gender') && isValid;
    isValid = this.checkValidation(dateElement.value, 'date') && isValid;
    isValid = this.checkValidation(checkboxElement.checked, 'checkbox') && isValid;

    return isValid;
  }

  getFormElements():
    | {
        fileElement: HTMLInputElement;
        nameElement: HTMLInputElement;
        statusElement: HTMLSelectElement;
        speciesElement: HTMLInputElement;
        genderElement: HTMLSelectElement;
        dateElement: HTMLInputElement;
        checkboxElement: HTMLInputElement;
      }
    | undefined {
    try {
      const fileElement: HTMLInputElement | null = this.fileInput.current;
      if (!fileElement) {
        throw new Error('fileElement is undefined');
      }

      const nameElement: HTMLInputElement | null = this.nameInput.current;
      if (!nameElement) {
        throw new Error('nameElement is undefined');
      }

      const statusElement: HTMLSelectElement | null = this.statusSelect.current;
      if (!statusElement) {
        throw new Error('statusElement is undefined');
      }

      const speciesElement: HTMLInputElement | null = this.speciesInput.current;
      if (!speciesElement) {
        throw new Error('speciesElement is undefined');
      }

      const genderElement: HTMLSelectElement | null = this.genderSelect.current;
      if (!genderElement) {
        throw new Error('genderElement is undefined');
      }

      const dateElement: HTMLInputElement | null = this.dateInput.current;
      if (!dateElement) {
        throw new Error('dateElement is undefined');
      }

      const checkboxElement: HTMLInputElement | null = this.checkboxProcessing.current;
      if (!checkboxElement) {
        throw new Error('checkboxElement is undefined');
      }

      return {
        fileElement,
        nameElement,
        statusElement,
        speciesElement,
        genderElement,
        dateElement,
        checkboxElement,
      };
    } catch (error) {
      console.error(error);
    }
  }

  onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const { nameElement, statusElement, speciesElement, genderElement, dateElement } =
      this.getFormElements() as {
        fileElement: HTMLInputElement;
        nameElement: HTMLInputElement;
        statusElement: HTMLSelectElement;
        speciesElement: HTMLInputElement;
        genderElement: HTMLSelectElement;
        dateElement: HTMLInputElement;
        checkboxElement: HTMLInputElement;
      };

    this.setState({ firstChangeForm: true });

    if (!this.validate()) {
      this.setState({ buttonDisabled: true });
      return;
    }

    this.setState({ alertIsVisible: true });
    setTimeout(() => this.setState({ alertIsVisible: false }), 3000);

    this.userCards.push({
      name: nameElement.value,
      status: statusElement.value,
      species: speciesElement.value,
      gender: genderElement.value,
      image: this.state.image as string,
      created: dateElement.value,
    });

    this.resetStateInputs();
  }

  resetStateInputs(): void {
    const {
      fileElement,
      nameElement,
      statusElement,
      speciesElement,
      genderElement,
      dateElement,
      checkboxElement,
    } = this.getFormElements() as {
      fileElement: HTMLInputElement;
      nameElement: HTMLInputElement;
      statusElement: HTMLSelectElement;
      speciesElement: HTMLInputElement;
      genderElement: HTMLSelectElement;
      dateElement: HTMLInputElement;
      checkboxElement: HTMLInputElement;
    };

    fileElement.value = '';
    nameElement.value = '';
    statusElement.value = '';
    speciesElement.value = '';
    genderElement.value = '';
    dateElement.value = '';
    checkboxElement.checked = false;

    this.setState({
      buttonDisabled: true,
      extension: true,
      file: true,
      name: true,
      status: true,
      species: true,
      gender: true,
      date: true,
      checkbox: true,
      image: null,
    });
  }

  render(): JSX.Element {
    return (
      <div className="container py-6 px-6 mx-auto">
        {/* <!-- Section: Design Block --> */}
        <section className="text-gray-800">
          {/* <!-- Jumbotron --> */}
          <div className="container mx-auto xl:px-32 text-left">
            <div className="grid sm:grid-cols-2 items-center">
              <div className="-mb-12 sm:mb-0">
                <div className="jumbotron-forms block rounded-sm shadow-sm px-6 py-12 sm:py-6 xl:py-12 sm:px-12 sm:-mr-14">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3 ">Character generator</h3>
                  <form
                    className="flex flex-col justify-center sm:justify-start xl:justify-start xl:w-96"
                    onSubmit={this.onFormSubmit}
                  >
                    <FileInput
                      valid={this.state.file}
                      role="File"
                      name="file"
                      onChange={this.onChangeHandler}
                      reference={this.fileInput}
                      warningMessage={
                        this.state.extension
                          ? warningMessages.file.empty
                          : warningMessages.file.imgFormat
                      }
                    >
                      Choose avatar for your character
                    </FileInput>

                    <TextInput
                      valid={this.state.name}
                      role="Name"
                      name="name"
                      onChange={this.onChangeHandler}
                      reference={this.nameInput}
                      warningMessage={warningMessages.name.empty}
                    />

                    <Select
                      valid={this.state.status}
                      subject="Select status"
                      name="status"
                      options={['Alive', 'Dead', 'unknown']}
                      defaultValue=""
                      onChange={this.onChangeHandler}
                      reference={this.statusSelect}
                      warningMessage={warningMessages.status.empty}
                    />

                    <TextInput
                      valid={this.state.species}
                      role="Species"
                      name="species"
                      onChange={this.onChangeHandler}
                      reference={this.speciesInput}
                      warningMessage={warningMessages.species.empty}
                    />

                    <Select
                      valid={this.state.gender}
                      subject="Select gender"
                      name="gender"
                      options={['Male', 'Female', 'unknown']}
                      defaultValue=""
                      onChange={this.onChangeHandler}
                      reference={this.genderSelect}
                      warningMessage={warningMessages.gender.empty}
                    />

                    <DateInput
                      valid={this.state.date}
                      name="date"
                      onChange={this.onChangeHandler}
                      reference={this.dateInput}
                      warningMessage={warningMessages.date.empty}
                    />

                    <Checkbox
                      valid={this.state.checkbox}
                      name="checkbox"
                      onChange={this.onChangeHandler}
                      reference={this.checkboxProcessing}
                      warningMessage={warningMessages.checkbox.empty}
                    >
                      I consent to my personal data by Galactic Federation
                    </Checkbox>

                    <div className="flex gap-4">
                      <Button color="primary" disabled={this.state.buttonDisabled} role="submit">
                        Submit
                      </Button>
                      <Button
                        color="danger"
                        disabled={false}
                        role="reset"
                        onClick={this.resetStateInputs}
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div>
                <img src={formsImg} className="w-full rounded-sm shadow-sm" alt="forms-img" />
              </div>
            </div>
            <div
              className="user-cards-container flex flex-wrap mx-auto items-center justify-center
             mt-6 bg-gray-100 rounded-sm shadow-smg"
            >
              {this.userCards.length > 0 &&
                this.userCards.map(
                  (character: IUserCharacter, index: number): JSX.Element => (
                    <Card character={character} key={index} isButtonDisabled={true} />
                  )
                )}
            </div>
          </div>
          {/* <!-- Jumbotron --> */}
        </section>
        {/* <!-- Section: Design Block --> */}
        <Alert visibility={this.state.alertIsVisible} color={'success'}>
          User card is created
        </Alert>
      </div>
    );
  }
}
