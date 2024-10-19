'use server';

import { signIn } from '@/auth';

export async function doSocialLogin(formData: FormData) {
  const action = formData.get('action');

  if (action === 'google') {
    // Redirect to Google OAuth
    await signIn(action, { redirectTo: '/home' });
  } else if (action === 'github') {
    // Redirect to GitHub OAuth
  }
}

export async function doLogout() {}
