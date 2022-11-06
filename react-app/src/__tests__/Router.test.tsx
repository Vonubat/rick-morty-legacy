import React from 'react';
import { render, screen } from '../__mocks__/all-the-providers';
import { render as nativeRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Router', (): void => {
  const user: UserEvent = userEvent.setup();

  it('full app rendering/navigating', async (): Promise<void> => {
    render(<App />);

    // verify page content for default route
    expect(screen.getByRole('searchbox')).toBeInTheDocument();

    // verify page content for expected route after navigating
    await user.click(screen.getAllByText(/about/i)[0]);
    expect(
      screen.getByText(
        /This application will give you access to about hundreds of characters, images, locations and episodes. Is filled with canonical information as seen on the TV show/i
      )
    ).toBeInTheDocument();
  });

  it('landing on a bad page', (): void => {
    const badRoute = '/some/bad/route';

    // use <MemoryRouter> when you want to manually control the history
    nativeRender(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    // verify navigation to "no match" route
    expect(screen.getByText(/GET ME HOME/i)).toBeInTheDocument();
  });
});
