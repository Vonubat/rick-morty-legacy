import React, { Component } from 'react';

type MyProps = {
  children: string;
  role: string;
  name: string;
  valid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
};

type MyState = Record<string, never>;

export default class FileInput extends Component<MyProps, MyState> {
  render(): JSX.Element {
    let className = '';

    const cls = {
      baseClass: `form-control
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
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
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
      <div className="mt-3 xl:w-96">
        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">
          {this.props.children}
        </label>
        <input
          type="file"
          className={className}
          placeholder={this.props.role}
          name={this.props.name}
          onChange={this.props.onChange}
          ref={this.props.reference}
        />
      </div>
    );
  }
}
