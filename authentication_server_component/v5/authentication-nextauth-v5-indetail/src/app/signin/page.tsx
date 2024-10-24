import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

const SignIn = () => {
  const handleSubmit = async (formData: FormData) => {
    'use server';

    const action = formData.get('action');

    await signIn(action as 'BuiltInProviderType | (string & {}) | undefined', {
      redirectTo: '/',
    });
  };
  return (
    <>
      <form
        action={handleSubmit}
        className="flex flex-row justify-center mt-16 gap-4"
      >
        <Button
          type="submit"
          className="bg-green-400"
          name="action"
          value="google"
        >
          Signin with Google
        </Button>

        <Button
          type="submit"
          className="bg-sky-400"
          name="action"
          value="github"
        >
          Signin with Github
        </Button>
      </form>
    </>
  );
};

export default SignIn;
