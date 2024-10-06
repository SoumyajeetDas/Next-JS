import Link from 'next/link';
import React from 'react';
import classes from './mealItem.module.css';
import Image from 'next/image';

type MealItemType = {
  image: string | File;
  title: string;
  summary: string;
  slug?: string;
  creator: string;
};

const MealItem: React.FC<MealItemType> = ({
  image,
  title,
  summary,
  slug,
  creator,
}) => {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image as string} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
