import React, { Component } from 'react';

type MyProps = {
  [index: string]: string;
};

type MyState = {
  [index: string]: string;
};

export default class Button extends Component<MyProps, MyState> {
  render(): JSX.Element {
    return (
      <button
        type="button"
        className=" inline-block px-6 mt-3 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Tell me more!
      </button>
    );
  }
}
