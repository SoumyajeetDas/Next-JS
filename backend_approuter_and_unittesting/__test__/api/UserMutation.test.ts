import { createMocks } from 'node-mocks-http';
import mongoose from 'mongoose';
import connectToDB from '../../lib/model/db';
import User from '../../lib/model/user';
import { PATCH, DELETE } from '@/app/api/(auth)/users/[userid]/route';

// Mock the external dependencies
jest.mock('../../lib/model/db');
jest.mock('../../lib/model/user');

describe('PATCH /api/users/[userid]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a user successfully', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const updatedUser = { username: 'updatedUser' };

    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

    const { req } = createMocks({
      method: 'PATCH',
      url: `/api/users/${userId}`,
      body: JSON.stringify({ username: 'updatedUser' }) as unknown as Body,
    });

    const response = await PATCH(req, { params: { userid: userId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('User updated successfully');
    expect(connectToDB).toHaveBeenCalled();
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      new mongoose.Types.ObjectId(userId),
      { username: 'updatedUser' },
      { new: true },
    );
  });

  it('should handle missing user ID', async () => {
    const { req } = createMocks({
      method: 'PATCH',
      url: `/api/users/`,
      body: JSON.stringify({ username: 'updatedUser' }) as unknown as Body,
    });

    const response = await PATCH(req, { params: { userid: '' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('User ID is required');
  });

  it('should handle user not found', async () => {
    const userId = new mongoose.Types.ObjectId().toString();

    (connectToDB as jest.Mock).mockResolvedValue(null);

    // Mock User.findByIdAndUpdate to return null.
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const { req } = createMocks({
      method: 'PATCH',
      url: `/api/users/${userId}`,
      body: JSON.stringify({ username: 'updatedUser' }) as unknown as Body,
    });

    const response = await PATCH(req, { params: { userid: userId } });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('User not found');
    expect(connectToDB).toHaveBeenCalled();
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      new mongoose.Types.ObjectId(userId),
      { username: 'updatedUser' },
      { new: true },
    );
  });

  it('should handle database connection error', async () => {
    const userId = new mongoose.Types.ObjectId().toString();

    (connectToDB as jest.Mock).mockRejectedValue(
      new Error('DB Connection Error'),
    );

    const { req } = createMocks({
      method: 'PATCH',
      url: `/api/users/${userId}`,
      body: JSON.stringify({ username: 'updatedUser' }) as unknown as Body,
    });

    const response = await PATCH(req, { params: { userid: userId } });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('DB Connection Error');
    expect(connectToDB).toHaveBeenCalled();
  });

  it('should delete the user successfully', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const deletedUser = { username: 'deletedUser' };

    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedUser);

    const { req } = createMocks({
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });

    const response = await DELETE(req, { params: { userid: userId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('User deleted successfully');
    expect(connectToDB).toHaveBeenCalled();
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(
      new mongoose.Types.ObjectId(userId),
    );
  });

  it('should handle missing user ID', async () => {
    const { req } = createMocks({
      method: 'DELETE',
      url: `/api/users/`,
    });

    const response = await DELETE(req, { params: { userid: '' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('User ID is required');
  });

  it('should handle user not found', async () => {
    const userId = new mongoose.Types.ObjectId().toString();

    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const { req } = createMocks({
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });

    const response = await DELETE(req, { params: { userid: userId } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('User not found');
    expect(connectToDB).toHaveBeenCalled();
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(
      new mongoose.Types.ObjectId(userId),
    );
  });

  it('should handle database connection error', async () => {
    const userId = new mongoose.Types.ObjectId().toString();

    (connectToDB as jest.Mock).mockRejectedValue(
      new Error('DB Connection Error'),
    );

    const { req } = createMocks({
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });

    const response = await DELETE(req, { params: { userid: userId } });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('DB Connection Error');
    expect(connectToDB).toHaveBeenCalled();
  });
});
