import React, { Component } from 'react';

type MyProps = {
  visibility: boolean;
  children: string;
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // tailwind presentation
};

type MyState = Record<string, never>;

export default class Alert extends Component<MyProps, MyState> {
  render(): JSX.Element {
    const cls = {
      baseClass: `fixed font-semibold text-center inset-x-0 top-5 mx-10 animate-bounce rounded-lg py-5 px-6 mb-4 text-base mb-3`,
      visibleClass: `block`,
      invisibleClass: `hidden`,
      // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      // https://tailwind-elements.com/docs/standard/components/alerts/
      alertColors: {
        primary: 'bg-blue-100 text-blue-700',
        secondary: 'bg-purple-100 text-purple-700',
        success: 'bg-green-100 text-green-700',
        danger: 'bg-red-100 text-red-700',
        warning: 'bg-yellow-100 text-yellow-700',
        info: 'bg-indigo-100 text-indigo-700',
        light: 'bg-gray-50 text-gray-500',
        dark: 'bg-gray-300 text-gray-800',
      },
    };

    const visible = this.props.visibility;
    const className = `${cls.baseClass} ${visible ? cls.visibleClass : cls.invisibleClass} ${
      cls.alertColors[this.props.color]
    }`;

    return (
      <div className={className} role="alert">
        {this.props.children}
      </div>
    );
  }
}
