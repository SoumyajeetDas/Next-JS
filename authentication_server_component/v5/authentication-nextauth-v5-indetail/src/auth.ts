import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { Adapter } from 'next-auth/adapters';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,

  // Choose how you want to save the user session.
  // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  // If you use an `adapter` however, we default it to `"database"` instead. So session is not needed.
  // You can still force a JWT session by explicitly defining `"jwt"`.
  // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  // which is used to look up the session in the database.
  session: {
    strategy: 'database',
    // maxAge: 60,
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  // pages: {
  //   signIn: '/signin',
  // },

  // This will only be needed for Client Side Auth. Remember you also need Module Augmentation along with this to work. For Server side Auth
  // the extra params automatically gets embded depending on the model. For TS Module Augmentation is needed to work with the extra params
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      // We don't need to provide the clientId and clientSecret here as it will be automatically provided from the .env file. This
      // Only we have to keep in mind the env variable should be in the format of AUTH_{PROVIDER}_{ID|SECRET}

      // clientId: process.env.AUTH_GOOGLE_ID as string,
      // clientSecret: process.env.AUTH_GOOGLE_SECRET as string,

      // profile will return the user data from the Oauath provider. And that will be set into the DB. The advantage is you can add a field
      // just like I have added role field here. And that will be set into the DB.
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          accounts: profile.accounts,
          sessions: profile.sessions,
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

      // profile will return the user data from the Oauath provider. And that will be set into the DB. The advantage is you can add a field
      // just like I have added role field here. And that will be set into the DB.
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          accounts: profile.accounts,
          sessions: profile.sessions,
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
});
