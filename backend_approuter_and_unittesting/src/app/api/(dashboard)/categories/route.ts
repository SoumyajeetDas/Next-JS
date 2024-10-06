export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDB from '../../../../../lib/db';
import User from '../../../../../lib/model/user';
import Category, { ICategory } from '../../../../../lib/model/category';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // From Query Parameters
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          status: 400,
          message: 'User ID is required',
        },
        { status: 400 },
      );
    }

    await connectToDB();

    const mongooseUserId = new mongoose.Types.ObjectId(userId);

    const user = await User.findById(mongooseUserId);

    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          message: 'User not found',
        },
        { status: 404 },
      );
    }

    const category = await Category.find<ICategory>({ user: mongooseUserId });

    if (category.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: 'Category not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: 200,
      message: 'Categories fetched successfully',
      data: category,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  // From Query Parameters
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      {
        status: 400,
        message: 'User ID is required',
      },
      { status: 400 },
    );
  }

  // Convert userId to mongoose object id
  const mongooseObjectId = new mongoose.Types.ObjectId(userId);

  const { title } = await req.json();

  if (!title) {
    return NextResponse.json(
      {
        status: 400,
        message: 'Title is required',
      },
      { status: 400 },
    );
  }

  try {
    await connectToDB();

    const user = await User.findById(mongooseObjectId);

    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          message: 'User not found',
        },
        { status: 404 },
      );
    }

    const newCategory = await Category.create({
      title,
      user: user._id,
    });

    return NextResponse.json(
      {
        status: 201,
        message: 'Category created successfully',
        category: newCategory,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
