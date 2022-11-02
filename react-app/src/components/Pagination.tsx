import { useHomeContextState, useHomeContextUpdater } from 'context/HomeContext';
import React from 'react';

export const Pagination: () => JSX.Element = (): JSX.Element => {
  const { info, currentPage } = useHomeContextState();
  const { dispatchPage } = useHomeContextUpdater();

  const getPagination: () => (string | number)[] = (): (string | number)[] => {
    switch (info.pages) {
      case 0:
        return [];
      case 1:
        return [1];
      case 2:
        return [1, 2];
      case 3:
        return [1, 2, 3];
      case 4:
        return [1, 2, 3, 4];
      case 5:
        return [1, 2, 3, 4, 5];
      default:
        break;
    }
    if (currentPage <= 3) return [1, 2, 3, 4, '...', info.pages];
    if (currentPage <= info.pages - 3)
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', info.pages];
    return [1, '...', info.pages - 3, info.pages - 2, info.pages - 1, info.pages];
  };

  const from: number = (currentPage - 1) * 20 + 1;
  const to: number = currentPage === info.pages ? info.count : from + 19;

  return (
    <div className="flex flex-col items-center justify-center py-5 gap-1.5">
      <div>
        <p className={info.pages === 0 ? 'hidden' : 'text-sm text-gray-700'}>
          Showing <span className="font-medium">{from}</span> to{' '}
          <span className="font-medium">{to}</span> of{' '}
          <span className="font-medium">{info.count}</span> results
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-20 select-none ${
              currentPage === 1 || info.pages === 0
                ? 'opacity-50 pointer-events-none'
                : 'hover:bg-gray-50 cursor-pointer'
            }`}
            onClick={(): void => {
              dispatchPage({ type: 'decrement', payload: 1 });
            }}
          >
            Previous
          </a>
          {getPagination().map((item: string | number, index: number): JSX.Element => {
            let className =
              'relative hidden sm:inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 hover:cursor-pointer select-none';
            if (item === currentPage) {
              className =
                'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 pointer-events-none select-none';
            }
            if (typeof item === 'string') {
              className =
                'relative hidden sm:inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 select-none';
            }
            return (
              <a
                key={index}
                className={className}
                onClick={
                  typeof item === 'number'
                    ? (): void => {
                        dispatchPage({ type: 'set', payload: item });
                      }
                    : undefined
                }
              >
                {item}
              </a>
            );
          })}
          <a
            className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-20 select-none ${
              currentPage === info.pages || info.pages === 0
                ? 'opacity-50 pointer-events-none'
                : 'hover:bg-gray-50 cursor-pointer'
            }`}
            onClick={(): void => {
              dispatchPage({ type: 'increment', payload: 1 });
            }}
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  );
};
