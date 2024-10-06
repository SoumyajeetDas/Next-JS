import dbConnect from '@/lib/dbConnect';
import userModel from '@/model/User';
import { IMessage } from '@/model/User';

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    // is user accepting message

    if (!user.isAcceptingMessage) {
      return Response.json(
        { success: false, message: 'User is not accepting messages' },
        { status: 403 },
      );
    }

    const newMessage = {
      content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage as IMessage);

    await user.save();

    return Response.json(
      { success: true, message: 'Message sent' },
      { status: 200 },
    );
  } catch (error) {
    console.log('Error adding message:', error);
    return Response.json(
      { success: false, message: 'Error adding message' },
      { status: 500 },
    );
  }
}
