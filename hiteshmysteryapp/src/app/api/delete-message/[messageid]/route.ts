import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import userModel from '@/model/User';

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } },
) {
  const messageid = params.messageid;

  await dbConnect();
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!session || !session?.user) {
    return Response.json(
      { success: false, message: 'User Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const updateResult = await userModel.updateOne(
      {
        _id: user?._id,
      },
      {
        $pull: {
          messages: {
            _id: messageid,
          },
        },
      },
    );

    // Nothing modified
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { success: false, message: 'Message not found or already deleted' },
        { status: 404 },
      );
    }

    return Response.json(
      { success: true, message: 'Message deleted' },
      { status: 200 },
    );
  } catch (error) {
    console.log('An unexpected error occurred:', error);
    return Response.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
