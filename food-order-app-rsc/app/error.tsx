// Global Error
'use client';

import React from 'react';

const error: React.FC<{ error: Error }> = ({ error }) => {
  return <div id="error">An error ocuured !!</div>;
};

export default error;
