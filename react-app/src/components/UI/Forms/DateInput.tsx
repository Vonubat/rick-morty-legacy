import React, { Component } from 'react';

type MyProps = {
  name: string;
};

type MyState = Record<string, never>;

export default class DateInput extends Component<MyProps, MyState> {
  render(): JSX.Element {
    return (
      <div className="datepicker relative form-floating mb-3 xl:w-96">
        <input
          type="date"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Select a date"
          name={this.props.name}
        />
        <label htmlFor="floatingInput" className="text-gray-700">
          Select a date
        </label>
      </div>
    );
  }
}
