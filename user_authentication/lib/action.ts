'use server';

import { AuthFormErrorStateType } from '@/components/auth-form';
import { createUser, getUserByEmail } from './user';
import { hashUserPassword, verifyPassword } from './hash';
import { redirect } from 'next/navigation';
import { createAuthSession, destroySession } from './auth';

const isInvalidText = (text: string | null | undefined) =>
  !text || text.trim().length === 0;

const isValidEmail = (text: string) =>
  text.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) ? true : false;

const isValidPassword = (text: string) => text.length >= 2;

// Server actions are always async functions.
export const signUp = async (
  _prevStae: AuthFormErrorStateType | undefined,
  formData: FormData,
): Promise<AuthFormErrorStateType | undefined> => {
  const authData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (
    isInvalidText(authData.email) ||
    isInvalidText(authData.password) ||
    !isValidEmail(authData.email) ||
    !isValidPassword(authData.password)
  ) {
    return {
      message: {
        email: isInvalidText(authData.email)
          ? 'Email is required'
          : !isValidEmail(authData.email)
            ? 'Email is not valid'
            : '',
        password: isInvalidText(authData.password)
          ? 'Password is required'
          : !isValidPassword(authData.password)
            ? 'Password is too short'
            : '',
      },
    };
  }
  // Passing password as plain text is dangerous and can lead to security vulnerabilities.
  // createUser(authData.email, authData.password);

  // Hash the password and then store
  const hashedPassword = hashUserPassword(authData.password);

  try {
    const id = createUser(authData.email, hashedPassword);

    await createAuthSession(id.toString());
    redirect('/training');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        message: {
          email: 'Email already exists',
          password: '',
        },
      };
    }

    // If there is error other than duplicate email throw error which will be taken care by the error boundary
    throw err;
  }
};

export const login = async (
  _prevStae: AuthFormErrorStateType | undefined,
  formData: FormData,
) => {
  const authData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (
    isInvalidText(authData.email) ||
    isInvalidText(authData.password) ||
    !isValidEmail(authData.email) ||
    !isValidPassword(authData.password)
  ) {
    return {
      message: {
        email: isInvalidText(authData.email)
          ? 'Email is required'
          : !isValidEmail(authData.email)
            ? 'Email is not valid'
            : '',
        password: isInvalidText(authData.password)
          ? 'Password is required'
          : !isValidPassword(authData.password)
            ? 'Password is too short'
            : '',
      },
    };
  }

  // Check if the user exists
  const existingUser = getUserByEmail(authData.email);

  if (!existingUser) {
    return {
      message: {
        email: 'Could not find user with that email and password',
        password: '',
      },
    };
  }

  // If the user exists check if the uer has typed the correct password
  const verifiedPassword = verifyPassword(
    existingUser.password,
    authData.password,
  );

  if (!verifiedPassword) {
    return {
      message: {
        email: '',
        password: 'Password is incorrect',
      },
    };
  }

  // If all ok create a new session based on the id in the user table in the DB and add it to the user's browser
  await createAuthSession(existingUser.id.toString());
  redirect('/training');
};

export const auth = async (
  mode: 'login' | 'signup',
  _prevState: AuthFormErrorStateType | undefined,
  formData: FormData,
) => {
  if (mode === 'login') {
    return login(_prevState, formData);
  } else {
    return signUp(_prevState, formData);
  }
};

export const logout = async () => {
  await destroySession();
  redirect('/');
};
