import { CHARACTERS } from 'constants/constants';
import { rest } from 'msw';
import { characters } from './characters';

export const handlers = [
  rest.get(`${CHARACTERS}`, (req, res, ctx) => {
    const errorMessage = { error: 'There is nothing here' };
    const pageNumber = req.url.searchParams.get('page');
    let response;
    let status = 200;
    if (pageNumber === '1') {
      response = characters;
    } else if (pageNumber === '100') {
      response = errorMessage;
      status = 404;
    }
    return res(ctx.status(status), ctx.json(response));
  }),
];
