import { Body, createMocks } from 'node-mocks-http';
import User from '../../lib/model/user';
import { GET, POST } from '@/app/api/(auth)/users/route';
import connectToDB from '../../lib/model/db';

// Mock the external dependencies
jest.mock('../../lib/model/user');
jest.mock('../../lib/model/db');

describe('Users API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      // Mock the User.find() method
      (User.find as jest.Mock).mockResolvedValue([
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
      ]);

      const { req } = createMocks({
        method: 'GET',
      });

      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);

      expect(data.message).toBe('Users fetched successfully');
      expect(data.users).toHaveLength(2);
      expect(connectToDB).toHaveBeenCalled();
    });

    it('should handle database connection errors', async () => {
      (connectToDB as jest.Mock).mockRejectedValue(
        new Error('DB Connection Error'),
      );

      const { req, res } = createMocks({
        method: 'GET',
      });

      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('DB Connection Error');
      expect(connectToDB).toHaveBeenCalled();
    });

    it('should create a new user', async () => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      };

      (connectToDB as jest.Mock).mockResolvedValue(null);

      (User.create as jest.Mock).mockResolvedValue(newUser);

      const { req, res } = createMocks({
        method: 'POST',
        body: JSON.stringify(newUser) as unknown as Body,
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toBe('User created successfully');
      expect(data.user).toEqual(newUser);
      expect(connectToDB).toHaveBeenCalled();
    });

    it('should handle user creation errors', async () => {
      (connectToDB as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockRejectedValue(
        JSON.stringify(new Error('User Creation Error')),
      );

      const { req } = createMocks({
        method: 'POST',
        body: JSON.stringify({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
        }) as unknown as Body,
      });

      const response = await POST(req);

      expect(connectToDB).toHaveBeenCalled();
      expect(response.status).toBe(500);
    });
  });
});
