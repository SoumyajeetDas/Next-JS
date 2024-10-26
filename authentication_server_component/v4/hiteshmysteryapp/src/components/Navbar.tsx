'use client';

import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  // useSession will be refetched on window focus. To stop that we added refetchOnWindowFocus={false} with SessionProvider in AuthProvider.tsx

  // 1st Way
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/sign-in');
  //   },
  // });

  // 2nd Way
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="#" className="text-xl font-bold mb-4 md:mb-0">
          Mystery Message
        </Link>

        {status === 'loading' ? (
          <div>Authentication on the process...</div>
        ) : session ? (
          <>
            <span className="mr-4">
              Welcome {user?.username || user?.email}
            </span>
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={'outline'}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
