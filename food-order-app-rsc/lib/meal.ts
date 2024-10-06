import { MealDataType } from '@/component/meals/mealsGrid';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'fs';

const db = sql('meals.db');

export const getMeals = async (): Promise<MealDataType[]> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  // Added this loine to check the error handling
  // throw new Error('Failed to fetch meals');

  return db.prepare('SELECT * FROM meals').all() as MealDataType[];
};

export const getMeal = async (slug: string): Promise<MealDataType> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return db
    .prepare('SELECT * FROM meals WHERE slug = ?')
    .get(slug) as MealDataType;
};

export const saveMeal = async (meal: MealDataType) => {
  // Will change any title to a slug. Eg : mutton curry will become mutton-curry after passing through slugify function.
  // By default it will add - in berween the words having spaces.
  meal.slug = slugify(meal.title, { lower: true });

  // Need to use this package as used the prop dangerouslySetInnerHTML in the [mealSlug]/page.tsx file.
  meal.instructions = xss(meal.instructions);

  // The image parameter looks like :
  // image: File {
  //   size: 1520451,
  //   type: 'image/jpeg',
  //   name: 'IMG_20151112_210558.jpg',
  //   lastModified: 1714491106621
  // }
  const extension = (meal.image as File).name.split('.').pop(); // jpg
  const filename = `${meal.slug}.${extension}`; // mutton_curry.jpg

  const stream = fs.createWriteStream(`public/images/${filename}`); // Adding image to the public folder
  const budfferdImage = await (meal.image as File).arrayBuffer();

  stream.write(Buffer.from(budfferdImage), (error) => {
    if (error) {
      console.log(error);
      throw new Error('Saving Iamge Failed !!');
    }
  });

  meal.image = `/images/${filename}` as string;

  db.prepare(
    `
    INSERT INTO meals (image, title, summary, slug, creator, creator_email, instructions)
    VALUES (@image, @title, @summary, @slug, @creator, @creator_email, @instructions)
    `,
  ).run(meal);
};
