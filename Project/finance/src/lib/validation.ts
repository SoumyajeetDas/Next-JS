/* eslint-disable @typescript-eslint/ban-ts-comment */

import { z } from 'zod';
import { categories, types } from './consts';

const transactionSchema = z
  .object({
    type: z.enum(types as [string, ...string[]]),

    // Before parsing it tranforms the value to undefined if it is an empty string or null or undefined
    // Ref: https://zod.dev/?id=preprocess
    category: z.preprocess(
      // @ts-ignore
      (val) => (val?.length ? val : undefined),
      z.string().optional(),
    ),

    // After parsing if it finds the value anything other than number, it will convert that into a number
    // Ref : https://zod.dev/?id=coercion-for-primitives
    amount: z.coerce.number().min(1, {
      message: 'Amount must be at least 1',
    }),
    description: z.string().optional(),

    // Refine in field level
    created_at: z.string().refine((val: string) => !isNaN(Date.parse(val)), {
      message: 'Date needs to contain a valid date',
    }),
  })

  // Refine in schema level. when we want to access multiple field for validation
  .refine(
    (data) => {
      // Category is required when type is Expense
      if (data.type === 'Expense') {
        return (
          data.category !== undefined && categories.includes(data.category)
        );
      }

      // Validation not required for category when type is not Expense
      return true;
    },
    {
      path: ['category'],
      message: 'Category is required for Expense',
    },
  );

export default transactionSchema;
