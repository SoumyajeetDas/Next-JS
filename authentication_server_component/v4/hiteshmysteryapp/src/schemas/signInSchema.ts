import { z } from 'zod';

export const signInSchema = z.object({
  identifier: z.string().email('Invalid email address'),
  password: z.string(), // During signIn we don't want to check password length
});
