import React, { Component } from 'react';

type MyProps = {
  visibility: boolean;
  children: string;
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // tailwind presentation
};

type MyState = Record<string, never>;

export default class Alert extends Component<MyProps, MyState> {
  render(): JSX.Element {
    let className = '';

    const cls = {
      baseClass: `fixed font-semibold text-center inset-x-72 top-5 animate-bounce`,
      isVisible: `block`,
      invisible: `hidden`,
      // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      alertColors: {
        primary: 'bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3',
        secondary: 'bg-purple-100 rounded-lg py-5 px-6 mb-4 text-base text-purple-700 mb-3',
        success: 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3',
        danger: 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3',
        warning: 'bg-yellow-100 rounded-lg py-5 px-6 mb-4 text-base text-yellow-700 mb-3',
        info: 'bg-indigo-100 rounded-lg py-5 px-6 mb-4 text-base text-indigo-700 mb-3',
        light: 'bg-gray-50 rounded-lg py-5 px-6 mb-4 text-base text-gray-500 mb-3',
        dark: 'bg-gray-300 rounded-lg py-5 px-6 mb-4 text-base text-gray-800 mb-3',
      },
    };

    const visible = this.props.visibility;
    if (visible) {
      className = `${cls.baseClass} ${cls.isVisible} ${cls.alertColors[this.props.color]}`;
    } else {
      className = `${cls.baseClass} ${cls.invisible} ${cls.alertColors[this.props.color]}`;
    }

    return (
      <div className={className} role="alert">
        {this.props.children}
      </div>
    );
  }
}
