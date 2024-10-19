import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from './app/data/users';

export const {
  handlers: { GET, POST },
  auth, // AUth can be used in any server side code execution.
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        if (credentials === null) return null;

        try {
          const user = getUserByEmail(credentials?.email);

          if (user) {
            if (user?.password === credentials?.password) {
              return user;
            } else {
              throw new Error('Password does not match');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (e: any) {
          return null;
        }
      },
    }),
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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,

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
