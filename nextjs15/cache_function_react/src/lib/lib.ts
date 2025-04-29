import axios from 'axios';
import { cache } from 'react';

export const fetchData = cache(async () => {
  const data = await axios(`http://localhost:8080/messages/1`);

  return data?.data;
});

export const getdata = cache(async (id: number) => {
  console.log('getdata', id);
  return id * 2;
});
