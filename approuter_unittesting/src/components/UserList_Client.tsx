import { useEffect, useState } from 'react';
import * as React from 'react';
import axios from 'axios';

export const UserList = () => {
  const [users, setUsers] = useState<Array<{ id: string; username: string }>>(
    [],
  );

  useEffect(() => {
    const fetchUsers = async () => {
      // For fetch import 'whatwg-fetch' in jest.setup.ts

      // const response = await fetch('/api/users');
      // const data = await response.json();

      const responses = await axios.get('/api/users');
      const data = responses.data;

      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        <div>
          <h1>List Of Users</h1>
          {users.map((user) => (
            <div key={user.id}>{user.username}</div>
          ))}
        </div>
      ) : (
        <span>No Users</span>
      )}
    </div>
  );
};
