'use client';

import { ApiResponse } from '@/types/Response.type';
import React, { use } from 'react';

const Card: React.FC<{ data: Promise<ApiResponse> }> = ({ data }) => {
  const dataContent = use(data);

  console.log(dataContent);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">{dataContent?.title}</h1>
      <p className="mt-4 text-lg">
        This is a simple example of using Next.js 15 with Tailwind CSS.
      </p>
    </div>
  );
};

export default Card;
