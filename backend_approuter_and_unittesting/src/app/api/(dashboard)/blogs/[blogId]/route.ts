import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../../../lib/model/user';
import Category from '../../../../../../lib/model/category';
import Blog from '../../../../../../lib/model/blog';
import mongoose from 'mongoose';

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { blogId: string };
  },
) {
  try {
    const { blogId } = params;

    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get('userId');
    const categoryId = searchParams.get('categoryId');

    if (!blogId) {
      return NextResponse.json(
        { status: 400, message: 'Blog ID is required' },
        { status: 400 },
      );
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

    const mongoUserId = new mongoose.Types.ObjectId(userId);
    const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);

    const user = await User.findById(mongoUserId);

    if (!user) {
      return NextResponse.json(
        { status: 400, message: 'User not found' },
        { status: 400 },
      );
    }

    const category = await Category.findById(mongoCategoryId);

    if (!category) {
      return NextResponse.json(
        { status: 400, message: 'Category not found' },
        { status: 400 },
      );
    }

    const blog = await Blog.findOne({
      _id: blogId,
      userId,
      categoryId,
    });

    if (!blog) {
      return NextResponse.json(
        { status: 400, message: 'Blog not found' },
        { status: 400 },
      );
    }

    return NextResponse.json({ status: 200, message: 'Blog found' });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500 },
    );
  }
}
