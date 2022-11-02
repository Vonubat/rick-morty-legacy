import React from 'react';
import { IAdditionalData } from 'types/models';
import { Badge } from './UI/Badge';
import { Table } from './UI/Table';

type MyProps = Pick<IAdditionalData, 'episodesCharacter' | 'locationCharacter' | 'characterName'>;

export const Modal: ({
  episodesCharacter,
  locationCharacter,
  characterName,
}: MyProps) => JSX.Element = ({
  episodesCharacter,
  locationCharacter,
  characterName,
}: MyProps): JSX.Element => {
  const { name: nameofLocation, type, dimension } = locationCharacter;
  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="modalCenteredScrollable"
      tabIndex={-1}
      aria-labelledby="modalCenteredScrollable"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current overflow-x-hidden">
          <div className="modal-header flex flex-shrink-0 items-center justify-between px-4 py-2 border-b border-gray-200 rounded-t-md">
            <h2
              className="text-3xl font-medium leading-normal text-gray-800"
              id="modalCenteredScrollableLabel"
            >
              {characterName}
            </h2>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative py-2 px-4">
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
            <Table
              heading={['Name', 'Air date', ' Episode']}
              episodesCharacter={episodesCharacter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
