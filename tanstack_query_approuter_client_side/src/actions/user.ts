'use server';

export const getUser = async () => {
  console.log('Get Uwer');
  const data = await fetch('http://localhost:3000/api/getUser');
  const json = await data.json();
  return json;
};

export const addUser = async (username: string) => {
  const data = await fetch('http://localhost:3000/api/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
  const json = await data.json();
  return json;
};
