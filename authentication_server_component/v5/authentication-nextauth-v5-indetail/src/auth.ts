import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { Adapter } from 'next-auth/adapters';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: 'database',
    // maxAge: 60,
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  // pages: {
  //   signIn: '/signin',
  // },
  providers: [
    GoogleProvider({
      // We don't need to provide the clientId and clientSecret here as it will be automatically provided from the .env file. This
      // Only we have to keep in mind the env variable should be in the format of AUTH_{PROVIDER}_{ID|SECRET}

      // clientId: process.env.AUTH_GOOGLE_ID as string,
      // clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
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
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
});
