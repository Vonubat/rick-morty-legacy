import Select from '../components/UI/Forms/Select';
import TextInput from '../components/UI/Forms/TextInput';
import React, { Component, createRef } from 'react';
import formsImg from './../assets/forms-img.webp';
import Button from 'components/UI/Button';
import DateInput from 'components/UI/Forms/DateInput';
import Checkbox from 'components/UI/Forms/Checkbox';
import FileInput from 'components/UI/Forms/FileInput';
import ValidationWarning from 'components/UI/Forms/ValidationWarning';
import { IUserCharacterSchema } from 'models';

type MyProps = Record<string, never>;

type MyState = {
  firstChangeForm: boolean;
  buttonDisable: boolean;
  file: boolean;
  name: boolean;
  status: boolean;
  species: boolean;
  gender: boolean;
  created: boolean;
  checkbox: boolean;
  image: string | null;
};

export default class Forms extends Component<MyProps, MyState> {
  fileInput: React.RefObject<HTMLInputElement>;
  nameInput: React.RefObject<HTMLInputElement>;
  statusSelect: React.RefObject<HTMLSelectElement>;
  speciesInput: React.RefObject<HTMLInputElement>;
  genderSelect: React.RefObject<HTMLSelectElement>;
  dateCreatedInput: React.RefObject<HTMLInputElement>;
  checkboxProcessing: React.RefObject<HTMLInputElement>;

  constructor(props: MyProps) {
    super(props);
    this.fileInput = createRef();
    this.nameInput = createRef();
    this.statusSelect = createRef();
    this.speciesInput = createRef();
    this.genderSelect = createRef();
    this.dateCreatedInput = createRef();
    this.checkboxProcessing = createRef();

    this.state = {
      firstChangeForm: false,
      buttonDisable: true,
      file: true,
      name: true,
      status: true,
      species: true,
      gender: true,
      created: true,
      checkbox: true,
      image: null,
    };
  }

  onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void {
    const target: (EventTarget & HTMLInputElement) | (EventTarget & HTMLSelectElement) = e.target;
    const name: string = target.name;
    const avatar: HTMLInputElement | null = this.fileInput.current;

    if (name === 'file' && avatar?.files && !avatar.files.length) {
      this.setState({ image: URL.createObjectURL(avatar.files[0]), file: true });
    }

    this.setState((prevState: Readonly<MyState>) => {
      return { ...prevState, [name]: true };
    }, this.enableButton);

    if (!this.state.firstChangeForm) {
      this.setState({ buttonDisable: false });
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
      this.state.created &&
      this.state.checkbox
    ) {
      this.setState((prevState: Readonly<MyState>) => {
        return { ...prevState, buttonDisable: false };
      });
    }
  }

  checkValidation(condition: boolean, name: string): boolean {
    if (condition) {
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
      fileElement,
      nameElement,
      statusElement,
      speciesElement,
      genderElement,
      createdElement,
      checkboxElement,
    } = this.getFormElements() as {
      fileElement: HTMLInputElement;
      nameElement: HTMLInputElement;
      statusElement: HTMLSelectElement;
      speciesElement: HTMLInputElement;
      genderElement: HTMLSelectElement;
      createdElement: HTMLInputElement;
      checkboxElement: HTMLInputElement;
    };

    let isValid = false;

    isValid = this.checkValidation(
      !this.state.image || !fileElement.files || !fileElement.files.length,
      'file'
    );

    isValid = this.checkValidation(nameElement.value.trim().length < 3, 'name');

    isValid = this.checkValidation(!statusElement.value, 'status');

    isValid = this.checkValidation(speciesElement.value.trim().length < 3, 'species');

    isValid = this.checkValidation(!genderElement.value, 'gender');

    isValid = this.checkValidation(!createdElement.value, 'date');

    isValid = this.checkValidation(!checkboxElement.value, 'checkbox');

    return isValid;
  }

  getFormElements():
    | {
        fileElement: HTMLInputElement;
        nameElement: HTMLInputElement;
        statusElement: HTMLSelectElement;
        speciesElement: HTMLInputElement;
        genderElement: HTMLSelectElement;
        createdElement: HTMLInputElement;
        checkboxElement: HTMLInputElement;
      }
    | undefined {
    try {
      const fileElement: HTMLInputElement | null = this.fileInput.current;
      if (!fileElement) {
        throw new Error('avatarValue is undefined');
      }

      const nameElement: HTMLInputElement | null = this.nameInput.current;
      if (!nameElement) {
        throw new Error('nameValue is undefined');
      }

      const statusElement: HTMLSelectElement | null = this.statusSelect.current;
      if (!statusElement) {
        throw new Error('statusValue is undefined');
      }

      const speciesElement: HTMLInputElement | null = this.speciesInput.current;
      if (!speciesElement) {
        throw new Error('speciesValue is undefined');
      }

      const genderElement: HTMLSelectElement | null = this.genderSelect.current;
      if (!genderElement) {
        throw new Error('genderValue is undefined');
      }

      const createdElement: HTMLInputElement | null = this.dateCreatedInput.current;
      if (!createdElement) {
        throw new Error('createdValue is undefined');
      }

      const checkboxElement: HTMLInputElement | null = this.checkboxProcessing.current;
      if (!checkboxElement) {
        throw new Error('checkboxValue is undefined');
      }

      return {
        fileElement,
        nameElement,
        statusElement,
        speciesElement,
        genderElement,
        createdElement,
        checkboxElement,
      };
    } catch (error) {
      console.error('error');
    }
  }

  onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const { nameElement, statusElement, speciesElement, genderElement, createdElement } =
      this.getFormElements() as {
        fileElement: HTMLInputElement;
        nameElement: HTMLInputElement;
        statusElement: HTMLSelectElement;
        speciesElement: HTMLInputElement;
        genderElement: HTMLSelectElement;
        createdElement: HTMLInputElement;
        checkboxElement: HTMLInputElement;
      };

    this.setState({ firstChangeForm: true });

    if (!this.validate()) {
      console.log('form cannot be submitted!');
      this.setState({ buttonDisable: true });
      return;
    }

    const newUserCharacterCard: IUserCharacterSchema = {
      name: nameElement.value,
      status: statusElement.value,
      species: speciesElement.value,
      gender: genderElement.value,
      image: this.state.image as string,
      created: createdElement.value,
    };
  }

  resetStateInputs(): void {
    const {
      fileElement,
      nameElement,
      statusElement,
      speciesElement,
      genderElement,
      createdElement,
      checkboxElement,
    } = this.getFormElements() as {
      fileElement: HTMLInputElement;
      nameElement: HTMLInputElement;
      statusElement: HTMLSelectElement;
      speciesElement: HTMLInputElement;
      genderElement: HTMLSelectElement;
      createdElement: HTMLInputElement;
      checkboxElement: HTMLInputElement;
    };

    fileElement.value = '';
    nameElement.value = '';
    statusElement.value = '';
    speciesElement.value = '';
    genderElement.value = '';
    createdElement.value = '';
    checkboxElement.checked = false;

    this.setState({
      buttonDisable: true,
      file: true,
      name: true,
      status: true,
      species: true,
      gender: true,
      created: true,
      checkbox: true,
      image: null,
    });
  }

  render(): JSX.Element {
    return (
      <div className="container my-12 px-6 mx-auto">
        {/* <!-- Section: Design Block --> */}
        <section className="text-gray-800">
          {/* <!-- Jumbotron --> */}
          <div className="container mx-auto xl:px-32 text-center sm:text-left">
            <div className="grid sm:grid-cols-2 items-center">
              <div className="mb-12 sm:mb-0">
                <div className="jumbotron-forms block rounded-sm shadow-sm px-6 py-12 sm:py-6 xl:py-12 sm:px-12 sm:-mr-14">
                  <h3 className="text-2xl font-bold text-blue-600 mb-5 ">Character generator</h3>
                  <form
                    className="flex flex-col justify-center sm:justify-start xl:justify-start"
                    onSubmit={this.onFormSubmit.bind(this)}
                  >
                    <FileInput name="file">Choose avatar for your character</FileInput>
                    <ValidationWarning>Please, choose avatar for your character</ValidationWarning>

                    <TextInput role="Name" name="name" />
                    <ValidationWarning>Please, write name for your character</ValidationWarning>

                    <Select
                      subject="Select status"
                      name="status"
                      options={['Alive', 'Dead', 'unknown']}
                    />
                    <ValidationWarning>Please, choose status of your character</ValidationWarning>

                    <TextInput role="Species" name="species" />
                    <ValidationWarning>Please, write species of your character</ValidationWarning>

                    <Select subject="Select gender" name="gender" options={['Male', 'Female']} />
                    <ValidationWarning>Please, choose gender of your character</ValidationWarning>

                    <DateInput name="date" />
                    <ValidationWarning>Please, choose a date</ValidationWarning>

                    <Checkbox name="checkbox">
                      I consent to my personal data by Galactic Federation
                    </Checkbox>
                    <ValidationWarning>Checkbox is required</ValidationWarning>

                    <div className="flex gap-4">
                      <Button color="primary" disabled={false} role="submit">
                        Submit
                      </Button>
                      <Button color="danger" disabled={false} role="button">
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
            <div className="user-cards-container"></div>
          </div>
          {/* <!-- Jumbotron --> */}
        </section>
        {/* <!-- Section: Design Block --> */}
      </div>
    );
  }
}
