import { Button } from 'components/UI/Button';
import { useHomeContextState } from 'context/HomeContext';
import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { Badge } from '../components/UI/Badge';
import { Table } from '../components/UI/Table';

export const Character: () => JSX.Element = (): JSX.Element => {
  const { currentCharacter, locationCharacter, episodesCharacter } = useHomeContextState();
  const { name: nameofLocation, type, dimension } = locationCharacter;

  return (
    <>
      {!currentCharacter ? <Navigate to="/" /> : null}
      <div className="flex justify-center mx-3 my-3">
        <div className="flex flex-col text-center">
          <h2 className="text-3xl text-blue-600 font-mono text-center mb-2">
            {`${currentCharacter?.name} [id: ${currentCharacter?.id}]`}
          </h2>
          <img
            className="rounded-t-lg w-96 h-auto m-auto"
            src={currentCharacter?.image}
            alt={currentCharacter?.name}
          />
        </div>
      </div>
      <div>
        <div className="selection:py-2 px-4 max-w-5xl m-auto">
          <h3 className="text-2xl text-blue-600 font-mono text-center">Location:</h3>
          <h3 className="text-1xl text-gray-400 font-mono text-center mb-2">
            [Name =&gt; Type =&gt; Dimension]
          </h3>
          <div className="flex flex-wrap gap-2 items-center justify-center mb-6">
            <Badge option={nameofLocation} />
            <Badge option={type} />
            <Badge option={dimension} />
          </div>
          <h3 className="text-2xl text-blue-600 font-mono text-center">
            List of episodes in which this character appeared:
          </h3>
          <Table heading={['Name', 'Air date', ' Episode']} episodesCharacter={episodesCharacter} />
          <div className="text-center mb-5">
            <NavLink to="/">
              <Button role="button" color="danger" disabled={false}>
                Back
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
