import React, { Component } from 'react';

export default class Card extends Component {
  render(): JSX.Element {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col rounded-lg shadow-lg bg-white max-w-sm text-center">
          <img
            className="rounded-t-lg"
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            alt="Rick Sanchez"
          />
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2">Rick Sanchez</h5>
            <p className="text-gray-700 text-base mb-2 text-start">
              <i>The status:</i> <b>Alive</b>
            </p>
            <p className="text-gray-700 text-base mb-2 text-start">
              <i>The species:</i> <b>Human</b>
            </p>
            <p className="text-gray-700 text-base mb-2 text-start">
              <i> The gender:</i> <b>Male</b>
            </p>
            <button
              type="button"
              className=" inline-block px-6 mt-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Tell me more!
            </button>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            Time at which the character was created in the database <br />{' '}
            <b>2017-11-04T18:48:46.250Z</b>
          </div>
        </div>
      </div>
    );
  }
}
