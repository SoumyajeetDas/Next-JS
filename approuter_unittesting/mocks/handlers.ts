/* eslint-disable prettier/prettier */
import { rest } from 'msw';

/**
 * When MSW starts checking for the url it goes in an array way. It will check for the first url in the array. If that fails will go to
 * next element in the array to match he endpoint. If nothing matches it will start throwing the warning "Intercepted the request without
 * a matching request handler"
 */
export const handler = [
  rest.get('/api/users', async (req, res, ctx) => {
    return res(
      // Delay the response by 400 ms
      ctx.delay(400),
      ctx.status(200),
      ctx.json([
        { id: 1, username: 'anson' },
        { id: 2, username: 'mike' },
      ]),
    );
  }),
];
