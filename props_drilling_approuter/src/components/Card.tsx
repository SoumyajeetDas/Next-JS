import { UserType } from '@/lib/getData';
import React from 'react';

const Card: React.FC<{ user: UserType }> = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.age}</p>
    </div>
  );
};

export default Card;
