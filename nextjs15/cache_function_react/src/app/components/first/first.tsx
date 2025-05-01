import { fetchData, getdata } from '@/lib/lib';
import React from 'react';

const First = async () => {
  const response = await fetchData(2);

  return (
    <>
      {getdata(2)}
      <h2>First</h2>
      <p>{response?.text}</p>
    </>
  );
};

export default First;
