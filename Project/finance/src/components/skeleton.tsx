/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

const Skeleton = (props: any) => {
  return (
    <div
      className={`animate-pulse w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md ${props.className}`}
    ></div>
  );
};

export default Skeleton;
