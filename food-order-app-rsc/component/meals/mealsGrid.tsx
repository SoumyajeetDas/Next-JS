import React from 'react';
import MealItem from './mealItem';
import styles from './mealsGrid.module.css';

export type MealDataType = {
  id?: string;
  image: string | File;
  title: string;
  summary: string;
  slug?: string;
  creator: string;
  creator_email: string;
  instructions: string;
};

type MealPropType = {
  meals: MealDataType[];
};

const MealsGrid: React.FC<MealPropType> = ({ meals }) => {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
