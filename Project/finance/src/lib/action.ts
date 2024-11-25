'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supbase/server';
import { z } from 'zod';
import transactionSchema from '@/lib/validation';
import { redirect } from 'next/navigation';

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

export async function fetchTransactions(range: string, offset = 0, limit = 10) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('fetch_transactions', {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  return data;
}

export async function updateTransaction(id: string, formData: FormData) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error('Invalid data');
  }
  const { error } = await createClient()
    .from('transactions')
    .update(formData)
    .eq('id', id);
  if (error) {
    throw new Error('Failed creating the transaction');
  }
  revalidatePath('/dashboard');
}

export async function deleteTransaction(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath('/dashboard');
}

export async function login(_prevState, formData: FormData) {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) {
    return {
      error: true,
      message: 'Error authenticating!',
    };
  }
  return {
    message: `Email sent to ${email}`,
  };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  redirect('/login');
}

export async function uploadAvatar(prevState, formData: FormData) {
  const supabase = createClient();
  const file = formData.get('file') as File;
  const fileExt = file?.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const { error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file);
  if (error) {
    return {
      error: true,
      message: 'Error uploading avatar',
    };
  }

  // Removing the old avatar file
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return {
      error: true,
      message: 'Something went wrong, try again',
    };
  }
  const avatar = userData.user.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from('avatars').remove([avatar]);
    if (error) {
      return {
        error: true,
        message: 'Something went wrong, try again',
      };
    }
  }

  // Associate the avatar with the user, by updating the user data
  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });

  if (dataUpdateError) {
    return {
      error: true,
      message: 'Error associating the avatar with the user',
    };
  }

  return {
    message: 'Updated the user avatar',
  };
}

export async function updateSettings(prevState, formData: FormData) {
  // it is empty
}
