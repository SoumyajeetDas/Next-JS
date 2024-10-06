'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

const MealFormSubmit: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting....' : 'Share Meal'}
    </button>
  );
};

export default MealFormSubmit;
