import React, { Component } from 'react';

type MyProps = {
  role: 'button' | 'submit' | 'reset' | undefined;
  children: string;
  disabled: boolean;
  extraClass?: string | undefined;
};

type MyState = {
  [index: string]: string;
};

export default class Button extends Component<MyProps, MyState> {
  render(): JSX.Element {
    const className = [
      `inline-block px-6 mt-3 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out`,
    ];

    const disabled = this.props.disabled;
    if (!disabled) {
      className.push(
        `hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg`
      );
    } else {
      className.push(`pointer-events-none opacity-60`);
    }

    let extraClass = this.props.extraClass;
    if (!extraClass) {
      extraClass = '';
    }
    return (
      <button
        type={this.props.role}
        className={`${className.join(' ')} ${this.props.extraClass}`}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
