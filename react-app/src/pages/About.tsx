import React from 'react';

export const About: () => JSX.Element = (): JSX.Element => {
  return (
    <div className="container-img p-12 text-center relative overflow-hidden bg-no-repeat bg-cover">
      <div className="wrapper-img absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
        <div className="flex justify-center items-center h-full">
          <div className="text-white">
            <h2 className="font-semibold text-4xl mb-4 whitespace-nowrap">Rick Morty Legacy</h2>
            <h4 className="font-semibold text-xl mb-6 mx-3">
              This application will give you access to about hundreds of characters, images,
              locations and episodes. Is filled with canonical information as seen on the TV show .
            </h4>
            <h4 className="font-semibold text-xl mb-6 mx-3">
              Based on{' '}
              <a
                className="text-green-600 hover:text-green-300"
                href="https://rickandmortyapi.com/about"
                target={'_blank'}
                rel="noreferrer"
              >
                The Rick and Morty API
              </a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
