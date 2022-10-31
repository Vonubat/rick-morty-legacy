import React, { Component } from 'react';

type MyProps = {
  role?: 'button' | 'submit' | 'reset';
  children: string;
  disabled: boolean;
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // tailwind presentation
  onClick?: () => void;
};

type MyState = Record<string, never>;

export default class Button extends Component<MyProps, MyState> {
  render(): JSX.Element {
    const cls = {
      baseClass: `inline-block px-6 mt-3 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out`,
      nonDisabledBtnClass: `hover:shadow-lg focus:shadow-lg active:shadow-lg`,
      disabledBtnClass: `pointer-events-none opacity-60`,
      // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      // https://tailwind-elements.com/docs/standard/components/buttons/
      btnColors: {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 text-white',
        secondary:
          'bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800 text-white',
        success:
          'bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-700 text-white',
        danger: 'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 text-white',
        warning:
          'bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700 text-white',
        info: 'bg-blue-400 hover:bg-blue-500 focus:bg-blue-500 active:bg-purple-600 text-white',
        light: 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 text-gray-700',
        dark: 'bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900 text-white',
      },
    };

    const disabled = this.props.disabled;
    const className = `${cls.baseClass} ${
      disabled ? cls.disabledBtnClass : cls.nonDisabledBtnClass
    } ${cls.btnColors[this.props.color]}`;

    return (
      <button
        type={this.props.role}
        className={className}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
