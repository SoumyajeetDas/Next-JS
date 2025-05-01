import axios from 'axios';
import { cache } from 'react';

export const fetchData = cache(async (id: number) => {
  const data = await axios(`http://localhost:8080/messages/${id}`);

  return data?.data;
});

export const getdata = cache(async (id: number) => {
  console.log('getdata', id);
  return id * 2;
});
