'use client';

import Link from 'next/link';
import UserButton from './UserButton';
import SignInButton from './SignInButton';
import { useSession } from 'next-auth/react';

export default function NavBar() {
  // TODO: Show the currently logged-in user

  // During Server side component
  // const session = await auth();
  // const user = session?.user;

  // During client side component
  const session = useSession();
  const user = session?.data?.user;

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Next-Auth v5 Tutorial
        </Link>
        {user && session?.status !== 'loading' ? (
          <UserButton user={user} />
        ) : (
          <SignInButton />
        )}
      </nav>
    </header>
  );
}
