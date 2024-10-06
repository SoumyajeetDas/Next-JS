import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import mongoose from 'mongoose';
import userModel from '@/model/User';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: 'User Unauthorized' },
      { status: 401 },
    );
  }

  // Converting user?.id from string to mongoose object id. Otherwise it will throw an error during aggregation.
  const userId = new mongoose.Types.ObjectId(user?._id);

  try {
    const userData = await userModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: '$messages',
      },
      { $sort: { 'messages.createdAt': -1 } },
      {
        $group: {
          _id: '$_id',
          messages: { $push: '$messages' },
        },
      },
    ]);

    if (!userData || userData.length === 0) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 401 },
      );
    }

    return Response.json({ success: true, messages: userData[0].messages });
  } catch (error) {
    console.log('An unexpected error occurred:', error);
    return Response.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
