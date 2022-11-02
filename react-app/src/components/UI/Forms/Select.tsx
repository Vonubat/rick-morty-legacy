import React, { Component } from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  subject: string;
  name: string;
  options: string[];
  valid: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  reference: React.RefObject<HTMLSelectElement>;
  warningMessage: string;
};

type MyState = Record<string, never>;

export default class Select extends Component<MyProps, MyState> {
  render(): JSX.Element | JSX.Element[] {
    let className = '';

    const cls = {
      baseClass: `form-select form-select-lg
      appearance-none
      block
      w-full
      px-3
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
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
        <div className="mt-3 xl:w-96">
          <select
            defaultValue={''}
            className={className}
            aria-label=".form-select-lg"
            placeholder={this.props.subject}
            name={this.props.name}
            onChange={this.props.onChange}
            ref={this.props.reference}
            data-testid="select"
          >
            <option disabled value="">
              {this.props.subject}
            </option>
            {this.props.options.map((option: string): JSX.Element => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <ValidationWarning valid={this.props.valid}>{this.props.warningMessage}</ValidationWarning>
      </>
    );
  }
}
