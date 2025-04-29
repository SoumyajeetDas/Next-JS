import { fetchData, getdata } from '@/lib/lib';
import React from 'react';

const Third = async () => {
  const response = await fetchData();

  return (
    <div>
      <h2>Third</h2>

      {getdata(2)}
      <p>{response?.text}</p>
    </div>
  );
};

export default Third;
