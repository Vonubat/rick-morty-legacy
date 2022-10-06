import React, { Component } from 'react';

type MyProps = {
  children: string;
  valid: boolean;
};

type MyState = Record<string, never>;

export default class ValidationWarning extends Component<MyProps, MyState> {
  render(): JSX.Element {
    let className = '';

    const cls = {
      baseClass: ``,
      isValid: `text-transparent`,
      isInvalid: `text-red-700`,
    };

    const valid = this.props.valid;
    if (!valid) {
      className = `${cls.baseClass} ${cls.isInvalid}`;
    } else {
      className = `${cls.baseClass} ${cls.isValid}`;
    }
    return <p className={className}>{this.props.children}</p>;
  }
}
