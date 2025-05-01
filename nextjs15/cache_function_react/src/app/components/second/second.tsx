// export const dynamic = 'force-dynamic'; // This will make the page dynamic and not cache it
// export const revalidate = 0; // This will make the page dynamic and not cache it

import { fetchData, getdata } from '@/lib/lib';
import React from 'react';

const Second = async () => {
  const response = await fetchData(2);

  return (
    <>
      {getdata(3)}
      {getdata(2)}
      <h2>Second</h2>
      <p>{response?.text}</p>
    </>
  );
};

export default Second;
