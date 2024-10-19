import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth, // AUth can be used in any server side code execution.
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      authorization: {
        params: {
          prompt: 'consent', // This will ask everytime whether we want to authorize the app or not
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
});
