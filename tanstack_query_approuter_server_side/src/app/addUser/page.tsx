'use client';

import { useAddApi } from '@/hooks/useAddApi';
import React, { useRef } from 'react';

const AddUser = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { mutate: addUser, isPending, isError, error } = useAddApi();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      addUser(ref.current.value);
      ref.current.value = '';
    }
  };

  if (isPending) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <h1>Error: {error?.message}</h1>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={ref} type="text" placeholder="Enter username" />
        <button type="submit">Add User</button>
      </form>
    </>
  );
};

export default AddUser;
