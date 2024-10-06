import { getMeal } from '@/lib/meal';
import Image from 'next/image';
import React from 'react';
import classes from './page.module.css';
import { notFound } from 'next/navigation';

type ParamType = {
  params: {
    mealSlug: string;
  };
};

// Dynamic Metadata
export const generateMetadata = async ({ params }: ParamType) => {
  const meal = await getMeal(params.mealSlug);

  // If this one is not given then meal.title and meal.summary will not be found and will get redirected to error.tsx page.
  if (!meal) {
    return;
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealSlug: React.FC<ParamType> = async ({ params }) => {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    // If the meal is not found, This function calls the closest not-found.tsx / jsx file and if not found finds the closest
    // error.tsx / jsx file, in the whole app folder hierarchy.
    // Ref : https://cognizant.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41159750#overview

    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image as string} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            // We need to use xss package as this feature makes app vluernable to xss attacks.
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealSlug;
