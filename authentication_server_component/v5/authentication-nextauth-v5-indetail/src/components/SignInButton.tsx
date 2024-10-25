'use client';

import React from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

const SignInButton = () => {
  return (
    // <form
    //   className="gap-4 flex flex-row"
    //   action={async (formData: FormData) => {
    //     'use server';

    //     const action = formData.get('action');
    //     await signIn(
    //       action as 'BuiltInProviderType | (string & {}) | undefined',
    //     );
    //   }}
    // >
    //   <Button name="action" value="github" type="submit">
    //     Signin with GitHub
    //   </Button>
    //   <Button name="action" value="google" type="submit">
    //     Signin with Google
    //   </Button>
    // </form>

    <div className="gap-4 flex flex-row">
      <Button onClick={() => signIn('github')}>Signin with GitHub</Button>
      <Button onClick={() => signIn('google')}>Signin with Google</Button>
    </div>
  );
};

export default SignInButton;
