'use client';

import { login } from '@/lib/action';
import Input from '@/components/input';
import React from 'react';
import SubmitButton from '@/components/submit-button';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  error: false,
};

const LoginForm = () => {
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form action={formAction} className="space-y-2">
      <Input
        type="email"
        placeholder="name@example.com"
        name="email"
        required
      />
      <SubmitButton type="submit" size="sm" className="w-full">
        Sign in with email
      </SubmitButton>

      <p
        className={`${state?.error ? 'text-red-500' : 'text-green-500'} text-sm text-center`}
      >
        {state?.message}
      </p>
    </form>
  );
};

export default LoginForm;
