// This component must be kept in between the <form></form>.

'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

const FormSubmit = () => {
  const { pending } = useFormStatus();
  //   console.log(pending);

  if (pending) {
    return <p className="form-actions">Creating Post...</p>;
  }
  return (
    <p className="form-actions">
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </p>
  );
};

export default FormSubmit;
