import { useRouter } from 'next/router';
import React from 'react';

const ProjectId = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Portfolio Page with Project ID: {router.query.projectId}</h1>
    </div>
  );
};

export default ProjectId;
