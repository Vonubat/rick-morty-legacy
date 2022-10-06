import Select from '../components/UI/Forms/Select';
import TextInput from '../components/UI/Forms/TextInput';
import React, { Component, createRef } from 'react';
import formsImg from './../assets/forms-img.webp';
import Button from 'components/UI/Button';
import DateInput from 'components/UI/Forms/DateInput';
import Checkbox from 'components/UI/Forms/Checkbox';
import FileInput from 'components/UI/Forms/FileInput';
import ValidationWarning from 'components/UI/Forms/ValidationWarning';

type MyProps = Record<string, never>;

type MyState = {
  firstChangeForm: boolean;
  buttonDisable: boolean;
  file: boolean;
  name: boolean;
  status: boolean;
  species: boolean;
  gender: boolean;
  date: boolean;
  checkbox: boolean;
  img: string | null;
};

// type StateKeys = "file"| "name"| "status"| "file"| "file"| "file"| "file"|

export default class Forms extends Component<MyProps, MyState> {
  fileInput: React.RefObject<HTMLInputElement>;
  nameInput: React.RefObject<HTMLInputElement>;
  statusSelect: React.RefObject<HTMLSelectElement>;
  speciesInput: React.RefObject<HTMLInputElement>;
  genderSelect: React.RefObject<HTMLSelectElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  checkboxProcessing: React.RefObject<HTMLInputElement>;

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
      buttonDisable: true,
      file: true,
      name: true,
      status: true,
      species: true,
      gender: true,
      date: true,
      checkbox: true,
      img: null,
    };
  }

  onChangeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    const target: (EventTarget & HTMLInputElement) | (EventTarget & HTMLSelectElement) = e.target;
    const name: string = target.name;
    const avatar: HTMLInputElement | null = this.fileInput.current;
    if (name === 'file' && avatar?.files && !avatar.files.length) {
      this.setState({ img: URL.createObjectURL(avatar.files[0]), file: true });
    }
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
                  <form className="flex flex-col justify-center sm:justify-start xl:justify-start">
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
