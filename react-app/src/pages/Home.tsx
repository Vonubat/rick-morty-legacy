import Card from 'components/Card';
import React, { Component } from 'react';

export default class Home extends Component {
  render(): JSX.Element {
    return (
      <div className="container flex">
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}
