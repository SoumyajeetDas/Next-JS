/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from '@/lib/dbConnect';
import userModel from '@/model/User';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bycrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    // During multiple providers we use this id and name
    // Refer: https://next-auth.js.org/providers/credentials
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();

        try {
          const user = await userModel.findOne({
            $or: [
              { email: credentials?.identifier },
              { username: credentials?.identifier },
            ],
          });

          // If no user not found
          if (!user) {
            throw new Error('No user found with this email');
          }

          if (!user.isVerified) {
            throw new Error('User not verified');
          }

          const isPasswordCorrect = await bycrypt.compare(
            credentials?.password as string,
            user.password,
          );

          // If password correct return the user
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Password is incorrect');
          }
        } catch (err) {
          throw new Error(err as string);
        }
      },
    }),
  ],
  // This is given if we want a custom login Page. If we don't want a custom login page and want Next JS to take care of these pages then
  // we can remove this option
  // Refer: https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/sign-in',
  },

  // Reference : https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async session({ session, token }) {
      // seesion by default doesn't contain much information. So, we are adding more user info in the session. And we are getting data
      // from token which we are adding into session. token got so much info from jwt() callback.
      // The reason session is able to access the token because jwt() callback is invoked before session() callback.

      // If we want to access the properties of the user and for getting no TS errro we need to do Module Augmentation in next-auth.d.ts
      // Reference : https://next-auth.js.org/getting-started/typescript
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },

    // When using JSON Web Tokens the jwt() callback is invoked before the session() callback, so anything you add to the JSON Web Token
    // will be immediately available in the session callback, like for example an access_token or id from a provider.
    async jwt({ token, user }) {

      // The user and account information comes up for the first time when we login. This basically tells us that the user is logged in for the first time.
      // From subsequent user value will not be passed
      if (user) {
        // token by default doesn't contain much fieds. So, we are adding more user info in the token.
        // This user info comes from authorize() in CrederntialsProvider

        // If we want to access the properties of the user and for getting no TS errro we need to do Module Augmentation in next-auth.d.ts
        // Reference : https://next-auth.js.org/getting-started/typescript
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      // This token structure gets created right on the first time when user is logged in. From subsequesnt request you will get same structure of token 
      // with whatever fields you have added in the first time.
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET, // This is a must
};
