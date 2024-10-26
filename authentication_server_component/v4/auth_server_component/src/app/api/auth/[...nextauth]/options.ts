/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/model/User';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      //@ts-ignore
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

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

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

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,

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
  secret: process.env.NEXTAUTH_SECRET,
  // jwt: {
  //   maxAge: 60, // 60 seconds
  // },
};
