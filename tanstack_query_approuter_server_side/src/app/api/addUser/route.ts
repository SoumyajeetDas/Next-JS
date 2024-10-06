import dbConnect from '@/lib/dbConnect';
import userModel from '../../../../model/User';

export async function POST(request: Request) {
  const { username } = await request.json();

  if (!username) {
    return Response.json({
      status: 400,
      message: 'Username is required',
    });
  }

  await dbConnect();

  try {
    const user = await userModel.create({ username });

    return Response.json({
      status: 201,
      data: user,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: err,
    });
  }
}
