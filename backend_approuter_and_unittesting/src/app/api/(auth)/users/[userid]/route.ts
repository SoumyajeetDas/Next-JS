import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../../../lib/model/user';
import mongoose from 'mongoose';
import connectToDB from '../../../../../../lib/model/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userid: string } },
) {
  try {
    await connectToDB();

    const { userid } = params;

    if (!userid) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      );
    }

    // Convert the userid to a mongoose object id
    const mongooseObjectId = new mongoose.Types.ObjectId(userid);

    let body = null;

    try {
      body = await req.json();
    } catch {
      body = JSON.parse(req.body as unknown as string);
    }

    const { username } = body;

    const updatedUser = await User.findByIdAndUpdate(
      mongooseObjectId,
      { username },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userid: string } },
) {
  try {
    await connectToDB();

    const { userid } = params;

    if (!userid) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      );
    }

    const mongooseObjectId = new mongoose.Types.ObjectId(userid);

    const deletedUser = await User.findByIdAndDelete(mongooseObjectId);

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
