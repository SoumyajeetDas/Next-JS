// export const dynamic = 'force-dynamic'; // This will make the page dynamic and not cache it

import { fetchData, getdata } from '@/lib/lib';
import React from 'react';

const First = async () => {
  const response = await fetchData();

  return (
    <>
      {getdata(2)}
      <h2>First</h2>
      <p>{response?.text}</p>
    </>
  );
};

export default First;
