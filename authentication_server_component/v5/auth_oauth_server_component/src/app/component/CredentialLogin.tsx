/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
'use client';

import React, { useState } from 'react';
import { doCredentialLogin } from '../actions';
import { useRouter } from 'next/navigation';

const CredentialLogin = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const response = await doCredentialLogin(formData);

      if (response?.error) {
        setError(response.error.message);
      } else {
        router.push('/home');
      }
    } catch (error: any) {
      setError('Check your Credentials');
    }
  };
  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form
        onSubmit={handleFormSubmit}
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
      >
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Credential Login
        </button>
      </form>
    </>
  );
};

export default CredentialLogin;
