import Link from 'next/link';
import React, { Suspense } from 'react';
import styles from './page.module.css';
import MealsGrid from '@/component/meals/mealsGrid';
import MealsDataFetching from './mealsDataFetching';
import Loading from '../loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Meals',
  description: 'Delicious meals, created by you',
};

const Meals: React.FC = async () => {
  return (
    <>
      <header className={styles.meals_header}>
        <h1 className={styles.meals_heading}>
          Delicious meals, created by you
        </h1>

        <p className={styles.meals_para}>
          Choose your favourite recipe and cook it yourself. It's easy and fun!
        </p>
        <Link href="/share" id={styles.meals_button}>
          <span>Share your favourite recipe</span>
        </Link>
      </header>
      <main>
        {/* Putting the MealsGrid component inside the Suspense component, no need to show the loading component for the whole page.
        This increases the interactivity and let's the header of this page gets loaded, in the meantime let the meals can be fetched
        from the DB. */}
        <Suspense fallback={<Loading>Fetching Meals...</Loading>}>
          <MealsDataFetching />
        </Suspense>
      </main>
    </>
  );
};

export default Meals;
