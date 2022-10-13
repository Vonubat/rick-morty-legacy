import React, { Component } from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  role: string;
  name: string;
  valid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
  warningMessage: string;
};

type MyState = Record<string, never>;

export default class TextInput extends Component<MyProps, MyState> {
  render(): JSX.Element {
    let className = '';

    const cls = {
      baseClass: `form-control
      block
      w-full
      px-3
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
      <>
        <div className="form-floating mt-3">
          <input
            type="text"
            className={className}
            placeholder={this.props.role}
            name={this.props.name}
            onChange={this.props.onChange}
            ref={this.props.reference}
            data-testid="textInput"
            id={this.props.role}
          />
          <label htmlFor={this.props.role} className="text-gray-700">
            {this.props.role}
          </label>
        </div>
        <ValidationWarning valid={this.props.valid}>{this.props.warningMessage}</ValidationWarning>
      </>
    );
  }
}
