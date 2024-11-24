/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from '@/components/button';
import { Loader } from 'lucide-react';

const SubmitButton = (props: any) => {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-2`}
    >
      {pending && <Loader className="animate-spin w-4 h-4" />}
      {props.children}
    </Button>
  );
};

export default SubmitButton;
