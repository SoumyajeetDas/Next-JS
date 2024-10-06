import { createMocks } from 'node-mocks-http';
import mongoose from 'mongoose';
import { GET, POST } from '../../src/app/api/(dashboard)/blogs/route';
import connectToDB from '../../lib/model/db';
import User from '../../lib/model/user';
import Category from '../../lib/model/category';
import Blog from '../../lib/model/blog';

// Mock the external dependencies
jest.mock('../../lib/model/user');
jest.mock('../../lib/model/category');
jest.mock('../../lib/model/blog');
jest.mock('../../lib/model/db');

describe('Blogs API - GET', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if userId is missing', async () => {
    const categoryId = new mongoose.Types.ObjectId().toString();
    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?categoryId=${categoryId}`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('User ID is required');
  });

  it('should return 400 if categoryId is missing', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?userId=${userId}`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Category ID is required');
  });

  it('should return 400 if user is not found', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findById as jest.Mock).mockResolvedValue(null);

    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('User not found');
    expect(connectToDB).toHaveBeenCalled();
  });

  it('should return 400 if category is not found', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();

    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findById as jest.Mock).mockResolvedValue({});
    (Category.findById as jest.Mock).mockResolvedValue(null);

    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Category not found');
    expect(connectToDB).toHaveBeenCalled();
  });

  it('should return 400 if no blogs are found', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findById as jest.Mock).mockResolvedValue({});
    (Category.findById as jest.Mock).mockResolvedValue({});
    (Blog.find as jest.Mock).mockImplementation(() => ({
      sort: jest.fn().mockResolvedValue([]),
    }));

    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe(
      'No blogs found for this user and category passed and also chek the searchKeyword passed in the params',
    );
    expect(connectToDB).toHaveBeenCalled();
  });

  it('should return 200 and blogs without search keyword', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    const blogs = [
      { title: 'Blog 1', description: 'Description 1' },
      { title: 'Blog 2', description: 'Description 2' },
    ];

    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findById as jest.Mock).mockResolvedValue({});
    (Category.findById as jest.Mock).mockResolvedValue({});
    (Blog.find as jest.Mock).mockImplementation(() => ({
      sort: jest.fn().mockResolvedValue(blogs),
    }));

    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toEqual(blogs);
    expect(connectToDB).toHaveBeenCalled();
  });

  it('should return 200 and blogs with search keyword', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    const blogs = [
      { title: 'Blog 1', description: 'Description 1' },
      { title: 'Blog 2', description: 'Description 2' },
    ];

    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findById as jest.Mock).mockResolvedValue({});
    (Category.findById as jest.Mock).mockResolvedValue({});
    (Blog.find as jest.Mock).mockImplementation(() => ({
      sort: jest.fn().mockResolvedValue(blogs),
    }));

    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}&searchKeyword=Blog`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toEqual(blogs);
    expect(connectToDB).toHaveBeenCalled();
  });

  it('should return 500 on database connection error', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    const blogs = [
      { title: 'Blog 1', description: 'Description 1' },
      { title: 'Blog 2', description: 'Description 2' },
    ];
    (User.findById as jest.Mock).mockResolvedValue({});
    (Category.findById as jest.Mock).mockResolvedValue({});
    (Blog.find as jest.Mock).mockImplementation(() => ({
      sort: jest.fn().mockResolvedValue(blogs),
    }));
    (connectToDB as jest.Mock).mockRejectedValue(
      new Error('DB Connection Error'),
    );

    const { req } = createMocks({
      method: 'GET',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe('DB Connection Error');
    expect(connectToDB).toHaveBeenCalled();
  });

  it('should return 400 if userId is missing', async () => {
    const categoryId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockResolvedValue(null);

    const mockBlog = {
      title: 'Test',
      description: 'Test description',
    };
    const { req } = createMocks({
      method: 'POST',
      url: `/api/blogs?categoryId=${categoryId}`,
      body: JSON.stringify(mockBlog) as unknown as Body,
    });

    const res = await POST(req);

    const data = await res.json();

    expect(data).toEqual({ status: 400, message: 'User ID is required' });

    expect(res.status).toBe(400);
  });

  it('should return 400 if categoryId is missing', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockResolvedValue(null);

    const mockBlog = {
      title: 'Test',
      description: 'Test description',
    };
    const { req } = createMocks({
      method: 'POST',
      url: `/api/blogs?userId=${userId}`,
      body: JSON.stringify(mockBlog) as unknown as Body,
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      status: 400,
      message: 'Category ID is required',
    });
  });

  it('should return 400 if user is not found', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findById as jest.Mock).mockResolvedValue(null);

    const mockBlog = {
      title: 'Test',
      description: 'Test description',
    };
    const { req } = createMocks({
      method: 'POST',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
      body: JSON.stringify(mockBlog) as unknown as Body,
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      status: 400,
      message: 'User not found',
    });
  });

  it('should return 400 if category is not found', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockResolvedValue(null);
    (User.findById as jest.Mock).mockResolvedValue({});
    (Category.findById as jest.Mock).mockResolvedValue(null);

    const mockBlog = {
      title: 'Test',
      description: 'Test description',
    };
    const { req } = createMocks({
      method: 'POST',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
      body: JSON.stringify(mockBlog) as unknown as Body,
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      status: 400,
      message: 'Category not found',
    });
  });

  it('should return 200 and create a blog successfully', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockResolvedValue(null);

    const mockBlog = {
      title: 'Test',
      description: 'Test description',
    };

    const { req } = createMocks({
      method: 'POST',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
      body: JSON.stringify(mockBlog) as unknown as Body,
    });

    (User.findById as jest.Mock).mockResolvedValue({});
    (Category.findById as jest.Mock).mockResolvedValue({});
    (Blog.create as jest.Mock).mockResolvedValue({
      title: 'Test',
      description: 'Test description',
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      status: 200,
      message: 'Blog created successfully',
      data: { title: 'Test', description: 'Test description' },
    });
  });

  it('should return 500 if there is an error', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const categoryId = new mongoose.Types.ObjectId().toString();
    (connectToDB as jest.Mock).mockRejectedValue(
      new Error('DB Connection Error'),
    );

    const mockBlog = {
      title: 'Test',
      description: 'Test description',
    };
    const { req } = createMocks({
      method: 'POST',
      url: `/api/blogs?userId=${userId}&categoryId=${categoryId}`,
      body: JSON.stringify(mockBlog) as unknown as Body,
    });

    const res = await POST(req);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      status: 500,
      message: 'DB Connection Error',
    });
  });
});
