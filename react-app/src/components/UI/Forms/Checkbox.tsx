import React, { Component } from 'react';

type MyProps = {
  name: string;
  children: string;
  valid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
};

type MyState = Record<string, never>;

export default class Checkbox extends Component<MyProps, MyState> {
  render(): JSX.Element {
    let className = '';

    const cls = {
      baseClass: `form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`,
      isValid: `is-valid`,
      isInvalid: `is-invalid`,
    };

    const valid = this.props.valid;
    if (!valid) {
      className = `${cls.baseClass} ${cls.isInvalid}`;
    } else {
      className = `${cls.baseClass}`;
    }

    return (
      <div className="form-check flex flex-nowrap">
        <input
          className={className}
          type="checkbox"
          value=""
          name={this.props.name}
          onChange={this.props.onChange}
          ref={this.props.reference}
        />
        <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
          {this.props.children}
        </label>
      </div>
    );
  }
}
