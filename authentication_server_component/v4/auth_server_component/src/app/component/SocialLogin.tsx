'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
// import { doSocialLogin } from '../actions';

const SocialLogin = () => {
  return (
    <div className="flex justify-center gap-4">
      <button
        className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg"
        onClick={() => signIn('google')}
      >
        Sign In With Google
      </button>

      <button
        className="bg-black text-white p-1 rounded-md m-1 text-lg"
        onClick={() => signIn('github')}
      >
        Sign In With GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
