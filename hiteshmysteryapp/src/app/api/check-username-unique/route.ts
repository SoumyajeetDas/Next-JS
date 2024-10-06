import { z } from 'zod';
import dbConnect from '../../../lib/dbConnect';
import { usernameValidation } from '../../../schemas/signUpSchema';
import userModel from '@/model/User';

const userNameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    // Removes the %20 or any other form of codes from the URL and decode the URL
    // Reference : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
    const decodeUrl = decodeURIComponent(request.url);
    // Getting query param
    const { searchParams } = new URL(decodeUrl);

    // URL : /api/check-username-unique?username=abc
    const queryParam = {
      username: searchParams.get('username'),
    };

    // Validate with zod that whether username passed through queryParam is valid or not.
    // The safeParse method from Zod is used to validate and parse data against a defined schema. It returns an object with two properties:
    // success: A boolean indicating whether the validation was successful.
    // data: The parsed data if validation succeeded, or undefined if it failed.
    // error: An object containing validation errors if the validation failed.

    const result = userNameQuerySchema.safeParse(queryParam);

    // If the result is not successful then return the error message which will consist of validation error message from ZOD
    if (!result.success) {
      // The result.error.format() will give the all error message in the form of object, but I need only the username related error
      // message so need to ass .username._errors
      const usernameErrors = result.error.format().username?._errors || [];

      // Once you get all the errors join all of them with , and show the validation error message to the end user
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
        },
        { status: 400 },
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await userModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: 'Username already exists' },
        { status: 400 },
      );
    }

    return Response.json(
      { success: true, message: 'Username available' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error checking username', err);

    return Response.json(
      { success: false, message: 'Error checking username' },
      {
        status: 500,
      },
    );
  }
}
