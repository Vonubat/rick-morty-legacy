import { setupServer } from 'msw/node';
import { handlers } from './server-handlers';

export const server = setupServer(...handlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: ({ method, url }) => {
      if (!url.pathname.startsWith('/api')) {
        throw new Error(`Unhandled ${method} request to ${url}`);
      }
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
