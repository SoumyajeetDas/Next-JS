import dbConnect from '@/lib/dbConnect';
import userModel from '@/model/User';

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Get username, code from body
    const { username, code } = await request.json();

    const user = await userModel.findOne({ username });

    // When no user
    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        {
          status: 400,
        },
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: 'Account verified successfully' },
        {
          status: 200,
        },
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            'Verification Code expired. Please signup again to get a new code',
        },
        {
          status: 400,
        },
      );
    } else {
      return Response.json(
        { success: false, message: 'Invalid verification code' },
        {
          status: 400,
        },
      );
    }
  } catch (err) {
    console.error('Error verifying user', err);

    return Response.json(
      { success: false, message: 'Error verifying user' },
      {
        status: 500,
      },
    );
  }
}
