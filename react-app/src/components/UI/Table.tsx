import React from 'react';
import { IHomeContextState } from 'types/models';

type MyProps = {
  heading: string[];
} & Pick<IHomeContextState, 'episodesCharacter'>;

export const Table: ({ heading, episodesCharacter }: MyProps) => JSX.Element = ({
  heading,
  episodesCharacter,
}: MyProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div className="py-2 inline-block min-w-full sm:px-2 lg:px-8">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-2 text-left">
                #
              </th>
              {heading.map(
                (item: string): JSX.Element => (
                  <th
                    key={item}
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-2 text-left"
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {episodesCharacter.slice(1).map(
              (
                item: {
                  name: string;
                  air_date: string;
                  episode: string;
                },
                index: number
              ): JSX.Element => (
                <tr key={index + 1} className="bg-white-100 border-b">
                  <td className="px-2 py-2 text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="text-sm text-gray-900 font-light px-2 py-2">
                    <a
                      href={`https://rickandmorty.fandom.com/wiki/Special:Search?query=${item.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-transparent hover:decoration-inherit transition duration-300 ease-in-out"
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-2 py-2">{item.air_date}</td>
                  <td className="text-sm text-gray-900 font-light px-2 py-2">{item.episode}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
