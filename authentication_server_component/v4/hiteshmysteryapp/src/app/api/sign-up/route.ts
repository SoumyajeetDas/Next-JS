import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import dbConnect from '@/lib/dbConnect';
import userModel from '@/model/User';
import bycrypt from 'bcryptjs';
export async function POST(request: Request) {
  await dbConnect();

  try {
    // Get the email, username, verifyCode from the request body
    const { email, username, password } = await request.json();

    // Check whether the username is present in the DB that is already registered and isVerified is true or not that means
    // verification is done with OTP or not
    const existingUserVerifiedByUsername = await userModel.findOne({
      username: username,
      isVerified: true,
    });

    // Username already exists with verification already done with OTP, so user cannot register with the same username
    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: 'Username already exists' },
        {
          status: 400,
        },
      );
    }

    // Now suppose username maynot be present in the DB that is user might have not retgistered with the username user typed currently
    //  or may be present but isVerified is false that means verification is not done with OTP, go with the email
    const existingUserUserByEmail = await userModel.findOne({
      email,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // If the user data is present with the email
    if (existingUserUserByEmail) {
      // Now check whether the user is already verified with OTP or not. This condition will only match if username is not present in
      // the DB but the corresponding email address is present in the DB. SOmetimes it so happens that user forgets with what username
      // that user has provided. So, in that case we need to check with the email address and after checking with email check verification
      // is done or not for the user
      if (existingUserUserByEmail.isVerified) {
        return Response.json(
          { success: false, message: 'Email already exists' },
          {
            status: 400,
          },
        );
      }
      // The email of user is present in DB, but it happens sometimes that user forgets the password. So, in that case update the password
      // and also the verifyCode(OTP) and verifyCodeExpiry in the DB
      else {
        const hashedPassword = await bycrypt.hash(password, 10);

        // Will update the password and verifyCode and verifyCodeExpiry in the DB of the user
        existingUserUserByEmail.password = hashedPassword;
        existingUserUserByEmail.verifyCode = verifyCode;
        existingUserUserByEmail.verifyCodeExpiry = new Date(
          Date.now() + 3600000,
        );

        await existingUserUserByEmail.save();

        // After this it will straight away send the verification email to the user
      }
    }
    // Neither user name nor user email is present in the DB, so we will take into conisderation that user is visiting the website
    // for the first time and is registering for the first time
    else {
      const hashedPassword = await bycrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      // Creating the new user and saving it into DB
      const newUser = new userModel({
        email,
        username,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();

      // After this it will straight away send the verification email to the user
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode,
    );

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        {
          status: 500,
        },
      );
    }

    return Response.json(
      { success: true, message: 'Verification email sent successfully' },
      {
        status: 200,
      },
    );
    // If there is any error while sending email
  } catch (error) {
    console.error('Error sending verification email', error);

    return Response.json(
      { success: false, message: 'Error registering user' },
      {
        status: 500,
      },
    );
  }
}
