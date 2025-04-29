export const revalidate = 0; // This will make the page dynamic and not cache it

import styles from './page.module.css';
import First from './components/first/first';
import Second from './components/second/second';
import { Suspense } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <Link prefetch={false} href="/third">
          Third
        </Link>
      </div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <First />
      </Suspense>
      <hr />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Second />
      </Suspense>
    </div>
  );
}
