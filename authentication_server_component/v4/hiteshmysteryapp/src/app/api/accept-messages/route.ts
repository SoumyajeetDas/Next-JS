import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import userModel from '@/model/User';

export async function POST(request: Request) {
  await dbConnect();

  // getServerSession helps to get the session data of the user
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: 'Not Authenticated' },
      { status: 401 },
    );
  }

  // User session is injected by us in in auth/[...nextauth]/options.ts
  const user = session?.user;

  const userId = user._id;

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { isAcceptMessages: acceptMessages },
      { new: true },
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 401 },
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Messages accepted updated',
        updatedUser,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error accepting messages', err);

    return Response.json(
      { success: false, message: 'Error accepting messages' },
      { status: 500 },
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: 'Not Authenticated' },
      { status: 401 },
    );
  }

  const userId = user?._id;

  try {
    const foundUser = await userModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    return Response.json(
      { success: true, isAcceptMessages: foundUser.isAcceptingMessage },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error getting user', err);

    return Response.json(
      { success: false, message: 'Error in getting message accepting status' },
      { status: 500 },
    );
  }
}
