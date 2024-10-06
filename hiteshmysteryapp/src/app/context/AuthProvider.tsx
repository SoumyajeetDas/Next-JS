'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // This Session Provider is resulting in  GET /api/auth/session 200 in 295ms in the logs
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
