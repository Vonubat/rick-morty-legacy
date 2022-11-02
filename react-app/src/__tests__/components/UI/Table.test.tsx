import React from 'react';
import { render } from '../../../__mocks__/all-the-providers';
import { Table } from 'components/UI/Table';

describe('Table component', (): void => {
  const mockTableData = [
    {
      name: '',
      air_date: '',
      episode: '',
    },
    {
      name: 'Rest and Ricklaxation',
      air_date: 'August 27, 2017',
      episode: 'S03E06',
    },
  ];

  it('renders table', (): void => {
    const { getByText } = render(
      <Table heading={['Name', 'Air date', ' Episode']} episodesCharacter={mockTableData} />
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Air date')).toBeInTheDocument();
    expect(getByText('Episode')).toBeInTheDocument();
    expect(getByText('Rest and Ricklaxation')).toBeInTheDocument();
    expect(getByText('August 27, 2017')).toBeInTheDocument();
    expect(getByText('S03E06')).toBeInTheDocument();
  });
});
