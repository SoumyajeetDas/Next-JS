'use client';

import { useApi } from '@/hooks/useApi';
import React from 'react';

const ShowUser = () => {
  const { isError, error, isLoading, data, isFetching } = useApi();

  if (isLoading || isFetching) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <h1>Error: {error?.message}</h1>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.data.map((user: { _id: string; username: string }) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowUser;
