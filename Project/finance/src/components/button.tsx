/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { sizes, variants } from '@/lib/variants';

const Button = (props: any) => {
  return (
    <button
      {...props}
      className={`${props.variant ? variants[props.variant] : variants['default']} ${props.size ? sizes[props.size] : sizes['base']}`}
    ></button>
  );
};

export default Button;
