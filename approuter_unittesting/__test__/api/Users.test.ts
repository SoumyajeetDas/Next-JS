import { createMocks } from 'node-mocks-http';
import { GET } from '../../src/app/api/users/route';

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    //   const req = new NextRequest('http://localhost:3000/api/users');
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    //   expect(data.status).toBe(200);
    //   expect(data.message).toBe('Users fetched successfully');
    //   expect(data.users).toHaveLength(2);
  });
});
