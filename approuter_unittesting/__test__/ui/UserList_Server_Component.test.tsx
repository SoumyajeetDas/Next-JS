import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { UserList } from '../../src/components/UserList_Server';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('UserList', () => {
  it('should have text anson', async () => {
    // Rendering Server Component
    // Ref : https://www.reddit.com/r/nextjs/comments/17mc9hn/how_do_you_test_async_server_components/
    render(await UserList());

    expect(await screen.findByText('anson')).toBeInTheDocument();
  });

  it('should have text jason', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.json([{ id: '1', username: 'jason' }]));
      }),
    );

    // Rendering Server Component
    // Ref : https://www.reddit.com/r/nextjs/comments/17mc9hn/how_do_you_test_async_server_components/
    render(await UserList());

    expect(await screen.findByText('jason')).toBeInTheDocument();
  });
});
