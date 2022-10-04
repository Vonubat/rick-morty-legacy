import React, { Component } from 'react';

type MyProps = {
  subject: string;
  options: string[];
};

type MyState = {
  [index: string]: string;
};

export default class SelectForm extends Component<MyProps, MyState> {
  render(): JSX.Element | JSX.Element[] {
    return (
      <div className="mb-3 xl:w-96">
        <select
          defaultValue={'DEFAULT'}
          className="form-select form-select-lg
      appearance-none
      block
      w-full
      px-3
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-lg example"
          placeholder="Gender"
        >
          <option disabled value="DEFAULT">
            {this.props.subject}
          </option>
          {this.props.options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
