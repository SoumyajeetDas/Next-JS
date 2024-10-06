import { z } from 'zod';

export const verifySchema = z.object({
  code: z.string().min(6, 'Verify Code must be of 6 characters'),
});
