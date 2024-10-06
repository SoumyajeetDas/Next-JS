export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../../../../lib/model/user';
import Category from '../../../../../lib/model/category';
import connectToDB from '../../../../../lib/model/db';
import Blog, { IBlog } from '../../../../../lib/model/blog';

export async function GET(req: NextRequest) {
  let userId, categoryId, searchKeyword;
  // For narmal API call
  try {
    const searchParams = req.nextUrl.searchParams;

    userId = searchParams.get('userId');
    categoryId = searchParams.get('categoryId');
    searchKeyword = searchParams.get('searchKeyword');
  } catch {
    // For API Testing
    // @ts-ignore
    const searchParams = req.query as {
      userId: string;
      categoryId: string;
      searchKeyword: string;
    };

    userId = searchParams.userId;
    categoryId = searchParams.categoryId;
    searchKeyword = searchParams.searchKeyword;
  }

  if (!userId) {
    return NextResponse.json(
      { status: 400, message: 'User ID is required' },
      { status: 400 },
    );
  }

  if (!categoryId) {
    return NextResponse.json(
      { status: 400, message: 'Category ID is required' },
      { status: 400 },
    );
  }

  const mongooseUserId = new mongoose.Types.ObjectId(userId);
  const mongooseCategoryId = new mongoose.Types.ObjectId(categoryId);

  try {
    await connectToDB();

    const user = await User.findById(mongooseUserId);

    if (!user) {
      return NextResponse.json(
        { status: 400, message: 'User not found' },
        { status: 400 },
      );
    }

    const category = await Category.findById(mongooseCategoryId);

    if (!category) {
      return NextResponse.json(
        { status: 400, message: 'Category not found' },
        { status: 400 },
      );
    }

    let blogs: IBlog[] = [];

    if (searchKeyword) {
      blogs = await Blog.find<IBlog>({
        user: mongooseUserId,
        category: mongooseCategoryId,
        $or: [
          { title: { $regex: searchKeyword, $options: 'i' } },
          { description: { $regex: searchKeyword, $options: 'i' } },
        ],
      })?.sort({ createdAt: -1 });
    } else {
      blogs = await Blog.find<IBlog>({
        user: mongooseUserId,
        category: mongooseCategoryId,
      }).sort({ createdAt: 1 });
    }

    if (blogs.length === 0) {
      return NextResponse.json(
        {
          status: 400,
          message:
            'No blogs found for this user and category passed and also chek the searchKeyword passed in the params',
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ status: 200, data: blogs }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { status: 500, message: error?.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  let userId = null;
  let categoryId = null;
  try {
    const searchParams = req.nextUrl.searchParams;

    userId = searchParams.get('userId');
    categoryId = searchParams.get('categoryId');
  } catch {
    // @ts-ignore
    const searchParams = req.query;

    userId = searchParams.userId;
    categoryId = searchParams.categoryId;
  }

  let body = null;
  try {
    body = await req.json();
  } catch {
    body = JSON.parse(req.body as unknown as string);
  }

  const { title, description } = body;

  if (!userId) {
    return NextResponse.json(
      { status: 400, message: 'User ID is required' },
      { status: 400 },
    );
  }

  if (!categoryId) {
    return NextResponse.json(
      { status: 400, message: 'Category ID is required' },
      { status: 400 },
    );
  }

  const mongooseUserId = new mongoose.Types.ObjectId(userId);
  const mongooseCategoryId = new mongoose.Types.ObjectId(categoryId);

  try {
    await connectToDB();

    const user = await User.findById(mongooseUserId);

    if (!user) {
      return NextResponse.json(
        { status: 400, message: 'User not found' },
        { status: 400 },
      );
    }

    const category = await Category.findById(mongooseCategoryId);

    if (!category) {
      return NextResponse.json(
        { status: 400, message: 'Category not found' },
        { status: 400 },
      );
    }

    const blog = await Blog.create({
      title,
      description,
      user: mongooseUserId,
      category: mongooseCategoryId,
    });

    return NextResponse.json(
      { status: 200, message: 'Blog created successfully', data: blog },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error?.message },
      { status: 500 },
    );
  }
}
