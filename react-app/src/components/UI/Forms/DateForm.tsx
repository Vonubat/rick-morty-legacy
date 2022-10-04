import React, { Component } from 'react';

export default class DateForm extends Component {
  render(): JSX.Element {
    return (
      <div>
        <input type="date" name="date" required />
        <span className="validity"></span>
      </div>
    );
  }
}
