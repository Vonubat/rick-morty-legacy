import React, { Component } from 'react';

type MyProps = {
  valid: boolean;
  children: string;
};

type MyState = Record<string, never>;

export default class ValidationWarning extends Component<MyProps, MyState> {
  render(): JSX.Element {
    const cls = {
      baseClass: ``,
      validClass: `text-transparent`,
      invalidClass: `text-red-700`,
    };

    const valid = this.props.valid;
    const className = `${cls.baseClass} ${valid ? cls.validClass : cls.invalidClass}`;

    return (
      <p className={className} data-testid="validationWarning">
        {this.props.children}
      </p>
    );
  }
}
