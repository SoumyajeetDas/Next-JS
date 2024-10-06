export const dynamic = 'force-dynamic';

import dbConnect from '@/lib/dbConnect';
import userModel from '../../../../model/User';

export async function GET() {
  await dbConnect();

  try {
    const user = await userModel.find();

    return Response.json({
      status: 200,
      data: user,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: err,
    });
  }
}
