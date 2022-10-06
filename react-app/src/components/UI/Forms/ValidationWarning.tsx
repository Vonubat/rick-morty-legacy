import React, { Component } from 'react';

type MyProps = {
  children: string;
};

type MyState = Record<string, never>;

export default class ValidationWarning extends Component<MyProps, MyState> {
  render() {
    return <p className="text-transparent">{this.props.children}</p>;
  }
}
