import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // To put all the types for User along with roles, we need to extend the User interface from next-auth
  interface Session {
    user: User & DefaultSession['user'];
  }
  interface User {
    role: string | null;
  }
}
