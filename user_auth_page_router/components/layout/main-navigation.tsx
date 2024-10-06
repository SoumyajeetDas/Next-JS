import Link from 'next/link';
import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/react';

function MainNavigation() {
  const { data: session, status } = useSession();

  const signOutHandler = () => {
    // If redirect to false the after clicking logout the page will not get reloaded
    signOut({ redirect: false });
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        {status === 'authenticated' && (
          <b className={classes.user}>Welcome {session?.user?.email} !!</b>
        )}
        <ul>
          {/* If no session and login status is false */}
          {!session && status === 'unauthenticated' && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && status === 'authenticated' && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && status === 'authenticated' && (
            <li>
              <button type="button" onClick={signOutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
