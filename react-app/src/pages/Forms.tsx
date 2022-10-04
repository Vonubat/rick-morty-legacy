import TextForm from 'components/TextForm';
import React, { Component } from 'react';
import formsImg from './../assets/forms-img.webp';

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
          <div className="container mx-auto xl:px-32 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="mb-12 lg:mb-0">
                <div className="jumbotron-forms block rounded-lg shadow-lg px-6 py-12 lg:py-6 xl:py-12 md:px-12 lg:-mr-14">
                  <h3 className="text-2xl font-bold mb-3">Character generator</h3>
                  <h5 className="text-lg text-blue-600 font-bold mb-6 lg:mb-4 xl:mb-6">
                    Create your own unique character!!!
                  </h5>
                  <TextForm role="Name" />
                  <TextForm role="Status" />
                  <TextForm role="Species" />
                </div>
              </div>

              <div>
                <img src={formsImg} className="w-full rounded-lg shadow-lg" alt="" />
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
