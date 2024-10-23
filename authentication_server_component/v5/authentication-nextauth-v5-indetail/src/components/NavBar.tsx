import { auth } from '@/auth';
import Link from 'next/link';
import UserButton from './UserButton';
import SignInButton from './SignInButton';

export default async function NavBar() {
  // TODO: Show the currently logged-in user
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Next-Auth v5 Tutorial
        </Link>
        {user ? <UserButton user={user} /> : <SignInButton />}
      </nav>
    </header>
  );
}
