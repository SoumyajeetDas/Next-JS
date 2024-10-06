import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(2, 'Username must be of 2 characters')
  .max(20, 'Username no more than 20 characters')
  .regex(
    /^[a-zA-Z0-9]+$/,
    'Username must be alphanumeric and should not contain special characters',
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be of 6 characters'),
});
