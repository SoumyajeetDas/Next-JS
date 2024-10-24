import { signIn } from '@/auth';
import React from 'react';
import { Button } from './ui/button';

const SignInButton = () => {
  return (
    <form
      className="gap-4 flex flex-row"
      action={async (formData: FormData) => {
        'use server';

        const action = formData.get('action');
        await signIn(
          action as 'BuiltInProviderType | (string & {}) | undefined',
        );
      }}
    >
      <Button name="action" value="github" type="submit">
        Signin with GitHub
      </Button>
      <Button name="action" value="google" type="submit">
        Signin with Google
      </Button>
    </form>
  );
};

export default SignInButton;
