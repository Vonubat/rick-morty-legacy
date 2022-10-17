import { CHARACTERS, EPISODES, LOCATIONS } from 'constants/constants';
import { rest } from 'msw';
import { charactersAll, charactersRick } from './characters';
import { episodes } from './episodes';
import { locations } from './locations';

export const handlers = [
  // good&bad request for CHARACTERS
  rest.get(`${CHARACTERS}`, (req, res, ctx) => {
    const errorMessage = { error: 'There is nothing here' };
    const pageNumber = req.url.searchParams.get('page');
    const nameFilter = req.url.searchParams.get('name');
    let response;
    let status = 200;

    if (pageNumber === '1') {
      response = charactersAll;

      if (nameFilter === 'Rick Sanchez') {
        response = charactersRick;
      }

      if (nameFilter === 'John doe') {
        response = errorMessage;
        status = 404;
      }
    } else if (pageNumber === '100') {
      response = errorMessage;
      status = 404;
    }

    return res(ctx.status(status), ctx.json(response));
  }),

  // good request for LOCATIONS
  rest.get(`${LOCATIONS}`, (req, res, ctx) => {
    const pageNumber = req.url.searchParams.get('page');
    const response = locations[Number(pageNumber) - 1];
    const status = 200;

    return res(ctx.status(status), ctx.json(response));
  }),

  // good request for EPISODES
  rest.get(`${EPISODES}`, (req, res, ctx) => {
    const pageNumber = req.url.searchParams.get('page');
    const response = episodes[Number(pageNumber) - 1];
    const status = 200;

    return res(ctx.status(status), ctx.json(response));
  }),
];
