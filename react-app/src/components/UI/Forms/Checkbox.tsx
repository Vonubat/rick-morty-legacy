import React, { Component } from 'react';
import ValidationWarning from './ValidationWarning';

type MyProps = {
  name: string;
  valid: boolean;
  children: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
  warningMessage: string;
};

type MyState = Record<string, never>;

export default class Checkbox extends Component<MyProps, MyState> {
  render(): JSX.Element {
    const className = `form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`;

    return (
      <>
        <div className="form-check flex flex-nowrap mt-3">
          <input
            className={className}
            type="checkbox"
            value=""
            name={this.props.name}
            onChange={this.props.onChange}
            ref={this.props.reference}
            data-testid="checkbox"
            id="checkbox"
          />
          <label className="form-check-label inline-block text-gray-800" htmlFor="checkbox">
            {this.props.children}
          </label>
        </div>
        <ValidationWarning valid={this.props.valid}>{this.props.warningMessage}</ValidationWarning>
      </>
    );
  }
}
