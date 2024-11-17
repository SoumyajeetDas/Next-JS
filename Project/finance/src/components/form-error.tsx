import React from 'react';

const FormError = ({ error }: { error: Error }) => {
  return error && <p className="mt-1 text-red-500">{error?.message}</p>;
};

export default FormError;
