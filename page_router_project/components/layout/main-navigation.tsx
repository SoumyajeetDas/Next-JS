import Link from 'next/link';
import classes from './main-navigation.module.css';
import Logo from './logo';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.link} href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link className={classes.link} href="/events">
              All Events
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
