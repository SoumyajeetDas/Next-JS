import { signIn } from '@/auth';
import React from 'react';
import { Button } from './ui/button';

const SignInButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
  );
};

export default SignInButton;
