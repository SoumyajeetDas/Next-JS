/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from './model/User';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import dbConnect from './lib/dbConnect';

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
          await dbConnect();
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
      // We don't need to provide the clientId and clientSecret here as it will be automatically provided from the .env file. This
      // Only we have to keep in mind the env variable should be in the format of AUTH_{PROVIDER}_{ID|SECRET}

      // clientId: process.env.AUTH_GOOGLE_ID as string,
      // clientSecret: process.env.AUTH_GOOGLE_SECRET as string,

      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          role: 'admin',
        };
      },
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GitHubProvider({
      // We don't need to provide the clientId and clientSecret here as it will be automatically provided from the .env file. This
      // Only we have to keep in mind the env variable should be in the format of AUTH_{PROVIDER}_{ID|SECRET}

      // clientId: process.env.AUTH_GITHUB_ID as string,
      // clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      profile(profile) {
        return {
          ...profile,
          id: profile.id.toString(),
          role: 'user',
        };
      },
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
      }

      return session;
    },
  },
  // jwt: {
  //   maxAge: 60, // 60 seconds
  // },
  session: {
    strategy: 'jwt',
  },
});
