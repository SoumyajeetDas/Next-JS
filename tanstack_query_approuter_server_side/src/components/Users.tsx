'use client';

import { useApi } from '@/hooks/useApi';
import React from 'react';

const Users = () => {
  const { data, isLoading, isFetching, isError, error } = useApi();

  if (isLoading || isFetching) {
    return <h1>Loading User....</h1>;
  }

  if (isError) {
    return <h1>Error: {error?.message}</h1>;
  }

  return (
    <div>
      <h1>Users Data</h1>
      <ul>
        {/* {data?.data?.map((user: { _id: string; username: string }) => (
          <li key={user._id}>{user.username}</li>
        ))} */}
        {data?.map((user: { id: string; username: string }) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
