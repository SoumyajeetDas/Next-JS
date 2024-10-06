/* eslint-disable @typescript-eslint/ban-ts-comment */
import { verifyPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { SessionStrategy } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialProvider, {
  CredentialInput,
  CredentialsConfig,
} from 'next-auth/providers/credentials';

export const authOptions = {
  // For enabling jwt both ways can be used. If jwt not given it will be by default database
  // jwt: {
  //   maxAge: 30 * 24 * 60 * 60,
  // },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      //   name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      //   credentials: {
      //     username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      //     password: { label: 'Password', type: 'password' },
      //   },

      //@ts-ignore
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials!.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password,
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();

        // As we pass email in the return that is the reason we get email in the session object.
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(
  authOptions as {
    session: {
      strategy: SessionStrategy | undefined;
      maxAge: number;
    };
    providers: CredentialsConfig<Record<string, CredentialInput>>[];
  },
);
