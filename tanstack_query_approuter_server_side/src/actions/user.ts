'use server';
import axios from 'axios';

export const getUser = async () => {
  // prefetchQuery is not working with the API created with the Next JS project in production
  // const response = await axios.get('http://localhost:3000/api/getUser');

  // But if we use api which is outside of the next js project then it will work
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );
  return response.data;
};

export const addUser = async (username: string) => {
  const response = await axios.post('http://localhost:3000/api/addUser', {
    username,
  });
  return response.data;
};
