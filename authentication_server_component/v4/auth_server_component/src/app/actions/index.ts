/* eslint-disable no-useless-catch */
'use server';

// import { signIn, signOut } from '@/auth';

// export async function doSocialLogin(formData: FormData) {
//   const action = formData.get('action');
//   await signIn(action as 'BuiltInProviderType | (string & {}) | undefined', {
//     redirectTo: '/home',
//   });
// }

// export async function doLogout() {
//   await signOut({ redirectTo: '/' });
// }

// export async function doCredentialLogin(formData: FormData) {
//   try {
//     // This credentials string tells that we are using credential based login
//     const response = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: false,
//     });
//     return response;
//   } catch (err) {
//     throw err;
//   }
// }
