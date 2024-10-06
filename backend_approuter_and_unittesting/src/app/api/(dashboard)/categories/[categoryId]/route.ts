import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '../../../../../../lib/db';
import User from '../../../../../../lib/model/user';
import Category from '../../../../../../lib/model/category';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { categoryId: string } },
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Category is required',
        },
        { status: 400 },
      );
    }

    const mongooseCategoryId = new mongoose.Types.ObjectId(categoryId);

    const searchParams = req.nextUrl.searchParams;
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

    const mongooseUserId = new mongoose.Types.ObjectId(userId);

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

    await connectToDB();

    const user = await User.findById(mongooseUserId);

    if (!user) {
      return NextResponse.json(
        {
          status: 400,
          message: 'User not found',
        },
        { status: 400 },
      );
    }

    const category = await Category.findOne({
      _id: mongooseCategoryId,
      user: mongooseUserId,
    });

    if (!category) {
      return NextResponse.json(
        {
          status: 400,
          message:
            'Category not found with the given combination of userId and categoryId',
        },
        { status: 400 },
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      mongooseCategoryId,
      { title },
      { new: true },
    );

    return NextResponse.json(
      {
        status: 200,
        message: 'Category updated successfully',
        category: updatedCategory,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } },
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return NextResponse.json({
        status: 400,
        message: 'Category is required',
      });
    }

    const mongooseCategoryId = new mongoose.Types.ObjectId(categoryId);

    const searchParams = req.nextUrl.searchParams;
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

    const mongooseUserId = new mongoose.Types.ObjectId(userId);

    await connectToDB();

    const user = await User.findById(mongooseUserId);

    if (!user) {
      return NextResponse.json(
        {
          status: 400,
          message: 'User not found',
        },
        { status: 400 },
      );
    }

    const category = await Category.findOne({
      _id: mongooseCategoryId,
      user: mongooseUserId,
    });

    if (!category) {
      return NextResponse.json(
        {
          status: 400,
          message:
            'Category not found with the given combination of userId and categoryId',
        },
        { status: 400 },
      );
    }

    await Category.findByIdAndDelete(mongooseCategoryId);

    return NextResponse.json(
      {
        status: 200,
        message: 'Category deleted successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
