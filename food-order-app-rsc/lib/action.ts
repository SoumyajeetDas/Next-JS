// When you mention 'use server' at the top of the file, all the functions inside this file all are Server Actions.

'use server';

import { revalidatePath } from 'next/cache';
import { saveMeal } from './meal';
import { redirect } from 'next/navigation';

const isInvalidText = (text: string | null | undefined) =>
  !text || text.trim().length === 0;

// type MessageResponseState = {
//   message: {
//     creator: string;
//     title: string;
//     summary: string;
//     instructions: string;
//     image: string;
//     creator_email: string;
//   };
// };
export const submiMealtHandler = async (prevState: any, formData: FormData) => {
  console.log('Hello');
  const meals = {
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
  };

  if (
    isInvalidText(meals.creator) ||
    isInvalidText(meals.title) ||
    isInvalidText(meals.summary) ||
    isInvalidText(meals.instructions) ||
    !meals.image ||
    meals.image.size === 0 ||
    isInvalidText(meals.creator_email) ||
    !meals.creator_email.includes('@')
  ) {
    // Sending Response from Server. And the response should be Serializable.
    return {
      message: {
        creator: isInvalidText(meals.creator)
          ? 'Please enter a valid creator name'
          : '',
        title: isInvalidText(meals.title) ? 'Please enter a valid title' : '',
        summary: isInvalidText(meals.summary)
          ? 'Please enter a valid summary'
          : '',
        instructions: isInvalidText(meals.instructions)
          ? 'Please enter a valid instructions'
          : '',
        image:
          !meals.image || meals.image.size === 0
            ? 'Please enter a valid image'
            : '',
        creator_email: isInvalidText(meals.creator_email)
          ? 'Please enter a valid email'
          : '',
      },
    };
  }

  await saveMeal(meals);

  // Triggering Cache Revalidation so that the new meal is shown in the list.
  // Ref : https://cognizant.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41159804#overview
  revalidatePath('/meals');

  redirect('/meals');
};
