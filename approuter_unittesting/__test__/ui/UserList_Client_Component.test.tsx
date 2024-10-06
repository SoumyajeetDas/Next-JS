import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { UserList } from '../../src/components/UserList_Client';

describe('UserList', () => {
  it('should have text anson', async () => {
    // Rendering Server Component
    render(<UserList />);

    expect(await screen.findByText('anson')).toBeInTheDocument();
  });

  it('should have text jason', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.json([{ id: '1', username: 'jason' }]));
      }),
    );

    // Rendering Server Component
    render(<UserList />);

    expect(await screen.findByText('jason')).toBeInTheDocument();
  });
});
