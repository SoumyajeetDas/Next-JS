import { z } from 'zod';
import { categories, types } from './consts';

const transactionSchema = z.object({
  type: z.enum(types as [string, ...string[]]),
  category: z.enum(categories as [string, ...string[]]),
  amount: z.coerce.number().min(1, {
    message: 'Amount must be at least 1',
  }),
  description: z.string().min(1, {
    message: 'The description is required',
  }),
  created_at: z.string().refine((val: string) => !isNaN(Date.parse(val)), {
    message: 'Date needs to contain a valid date',
  }),
});

export default transactionSchema;
