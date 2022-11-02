import React, { Component } from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../assets/the-morty-dance-loader.json';

// https://lottiefiles.com/39133-the-morty-dance-loader
export default class LoadIndicator extends Component {
  render(): JSX.Element {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-white bg-opacity-80 z-40">
        <div className="fixed text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 300, height: 300, zIndex: 50 }}
          />
          <h2 className="text-3xl text-blue-600 font-mono mt-3">Loading...</h2>
        </div>
      </div>
    );
  }
}
