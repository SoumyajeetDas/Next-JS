import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession['user']; // By default, TypeScript will merge new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above.
    // If you want to keep the default session user properties, you need to add them back into the newly declared interface
    // Reference : https://next-auth.js.org/getting-started/typescript
  }
}

// Reference : https://next-auth.js.org/getting-started/typescript#submodules
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}
