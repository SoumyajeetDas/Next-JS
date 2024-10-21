/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from './model/User';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth, // AUth can be used in any server side code execution.
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        if (!credentials) return null;

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error('User not found');
          }

          const isMatch = await bcrypt.compare(
            (credentials as { email: string; password: string }).password,
            user.password,
          );

          if (!isMatch) {
            throw new Error('Email or Password is not correct');
          }

          return user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('An unexpected error occurred');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
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
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});
