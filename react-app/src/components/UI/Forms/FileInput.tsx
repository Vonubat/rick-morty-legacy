import React, { Component } from 'react';

type MyProps = {
  children: string;
};

type MyState = {
  [index: string]: string;
};

export default class FileInput extends Component<MyProps, MyState> {
  render(): JSX.Element {
    return (
      <div className="mb-3 xl:w-96">
        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">
          {this.props.children}
        </label>
        <input
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
          type="file"
          required
        />
      </div>
    );
  }
}
