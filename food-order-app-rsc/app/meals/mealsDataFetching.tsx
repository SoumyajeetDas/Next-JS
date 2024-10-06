import MealsGrid from '@/component/meals/mealsGrid';
import { getMeals } from '@/lib/meal';
import React from 'react';

const MealsDataFetching: React.FC = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

export default MealsDataFetching;
