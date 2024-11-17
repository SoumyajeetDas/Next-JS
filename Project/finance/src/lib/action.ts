'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supbase/server';
import { z } from 'zod';
import transactionSchema from '@/lib/validation';

export async function createTransaction(
  data: z.infer<typeof transactionSchema>,
) {
  /* Validate data */
  // Server Side Form Validation
  const validated = transactionSchema.safeParse(data);
  console.log('Validated', validated);

  if (!validated.success) {
    console.error(validated.error);

    throw new Error('Invalid data');
  }

  console.log(data);
  const { error } = await createClient().from('transactions').insert(data);

  /* Handle errors */
  // If you get error from server action
  if (error) {
    throw new Error('Unable to create transaction');
  }

  // If all goes good then revalidate
  revalidatePath('/dashboard');
}
