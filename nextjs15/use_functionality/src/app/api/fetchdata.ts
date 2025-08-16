'use server';

import { ApiResponse } from '@/types/Response.type';

const fetchData = async (): Promise<ApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 20000));
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const json = await response.json();
  return json;

  //   return {
  //     userId: 1,
  //     id: 1,
  //     title: 'delectus aut autem',
  //     completed: false,
  //   };
};

export default fetchData;
