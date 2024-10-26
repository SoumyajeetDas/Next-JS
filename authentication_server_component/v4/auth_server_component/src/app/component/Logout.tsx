'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

const Logout = () => {
  return (
    <button
      className="bg-blue-400 my-2 text-white p-1 rounded"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: '/api/auth/signout?callbackUrl=/',
        })
      }
    >
      Logout
    </button>
  );
};

export default Logout;
