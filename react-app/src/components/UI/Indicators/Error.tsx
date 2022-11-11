import React from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../assets/the-morty-cry-error.json';

// https://lottiefiles.com/39138-morty-cry-loader
export const ErrorIndicator: () => JSX.Element = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center text-center mx-3 my-3">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 300, height: 300, zIndex: 50 }}
      />
      <h2 className="text-3xl text-blue-600 font-mono mt-3">Nobody exists on purpose.</h2>
      <h2 className="text-3xl text-blue-600 font-mono mt-3">Nobody belongs anywhere.</h2>
      <h2 className="text-3xl text-blue-600 font-mono mt-3">
        Nobody couldn&apos;t find you search query.
      </h2>
    </div>
  );
};
