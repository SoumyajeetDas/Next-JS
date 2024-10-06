import { useRouter } from 'next/router';
import React from 'react';

const SlugData = () => {
  const router = useRouter();
  console.log(router.query);
  return <h1>Slig Data</h1>;
};

export default SlugData;
