import { z } from 'zod';

export const messageSchema = z.object({
  message: z
    .string()
    .min(10, 'Message cannot be empty')
    .max(300, 'Message cannot be more than 30 characters'),
});
