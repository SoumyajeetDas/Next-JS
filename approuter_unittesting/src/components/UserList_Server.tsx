// 'use client';

// import { useEffect, useState } from 'react';
import * as React from 'react';
import axios from 'axios';

export const UserList = async () => {
  // For fetch import 'whatwg-fetch' in jest.setup.ts
  // const response = await fetch('/api/users');
  // const data = await response.json();

  const response = await axios.get('/api/users');
  const data: Array<{ id: string; username: string }> = response.data;

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <h1>List Of Users</h1>
          {data?.map((user) => <div key={user.id}>{user.username}</div>)}
        </div>
      ) : (
        <span>No Users</span>
      )}
    </div>
  );
};
