import React, { Component } from 'react';

type MyProps = {
  children: string;
};

type MyState = Record<string, never>;

export default class Checkbox extends Component<MyProps, MyState> {
  render(): JSX.Element {
    return (
      <div className="form-check">
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          value=""
        />
        <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
          {this.props.children}
        </label>
      </div>
    );
  }
}
