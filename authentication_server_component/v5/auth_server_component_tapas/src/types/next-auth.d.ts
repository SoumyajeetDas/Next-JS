import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  // To put all the types for User along with roles, we need to extend the User interface from next-auth
  interface Session {
    user: User & DefaultSession['user'];
  }
  interface User {
    role: string | null;
  }
}

// Reference : https://next-auth.js.org/getting-started/typescript#submodules
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role: string | null;
  }
}
