import SelectForm from '../components/UI/Forms/Select';
import TextForm from '../components/UI/Forms/TextInput';
import React, { Component } from 'react';
import formsImg from './../assets/forms-img.webp';
import Button from 'components/UI/Button';
import DateForm from 'components/UI/Forms/Datepicker';
import Checkbox from 'components/UI/Forms/Checkbox';
import FileInput from 'components/UI/Forms/FileInput';

type MyProps = {
  [index: string]: string;
};

type MyState = {
  [index: string]: string;
};

export default class Forms extends Component<MyProps, MyState> {
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
                  <h3 className="text-2xl font-bold mb-3">Character generator</h3>
                  <h5 className="text-lg text-blue-600 font-bold mb-6 sm:mb-4 xl:mb-6">
                    Create your own unique character!!!
                  </h5>
                  <form className="flex flex-col justify-center  sm:justify-start xl:justify-start">
                    <FileInput>Choose avatar for your character</FileInput>
                    <TextForm role="Name" />
                    <SelectForm subject="Select status" options={['Alive', 'Dead', 'unknown']} />
                    <TextForm role="Species" />
                    <SelectForm subject="Select gender" options={['Male', 'Female']} />
                    <DateForm />
                    <Checkbox>I consent to my personal data by Galactic Federation</Checkbox>
                    <Button disabled={false} extraClass="w-36" role="submit">
                      Submit
                    </Button>
                  </form>
                </div>
              </div>

              <div>
                <img src={formsImg} className="w-full rounded-sm shadow-sm" alt="forms-img" />
              </div>
            </div>
          </div>
          {/* <!-- Jumbotron --> */}
        </section>
        {/* <!-- Section: Design Block --> */}
      </div>
    );
  }
}
