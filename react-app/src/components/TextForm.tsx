import React, { Component } from 'react';

type MyProps = {
  [index: string]: string;
};

type MyState = {
  [index: string]: string;
};

export default class TextForm extends Component<MyProps, MyState> {
  render(): JSX.Element {
    return (
      <div className={`flex justify-center lg:justify-start xl:justify-start`}>
        <div>
          <div className="form-floating mb-3 xl:w-96">
            <input
              type="text"
              className="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingInput"
              placeholder={this.props.role}
            />
            <label htmlFor="floatingInput" className="text-gray-700">
              {this.props.role}
            </label>
          </div>
        </div>
      </div>
    );
  }
}
