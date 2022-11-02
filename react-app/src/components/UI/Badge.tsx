import React, { Component } from 'react';

type MyProps = {
  option: string;
};

type MyState = Record<string, never>;

export default class Badge extends Component<MyProps, MyState> {
  render(): JSX.Element {
    return (
      <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded">
        <a
          href={`https://rickandmorty.fandom.com/wiki/Special:Search?query=${this.props.option}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-transparent hover:decoration-inherit transition duration-300 ease-in-out"
        >
          {this.props.option || 'unknown'}
        </a>
      </span>
    );
  }
}
