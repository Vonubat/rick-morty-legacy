import { CHARACTERS } from 'constants/constants';
import { rest } from 'msw';
import characters from './characters';

export const handlers = [
  rest.get(`${CHARACTERS}/?page=1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characters));
  }),
  rest.get(`${CHARACTERS}/?page=1&name=John%20Doe`, (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ error: 'There is nothing here' }));
  }),
];
