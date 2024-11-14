/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

const Label = (props: any) => {
  return (
    <label
      {...props}
      className={`text-gray-700 dark:text-gray-300 ${props.className}`}
    ></label>
  );
};

export default Label;
