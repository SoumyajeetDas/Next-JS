/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

const Select = (props: any) => {
  return (
    <select
      {...props}
      className="w-full shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
    ></select>
  );
};

export default Select;
