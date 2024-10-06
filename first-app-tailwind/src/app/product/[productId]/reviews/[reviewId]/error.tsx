"use client"

import React from "react";

type ErrorBoundary = {
  error: Error;
  reset: () => void;
};
const ErrorBoundary: React.FC<ErrorBoundary> = ({ error, reset }) => {
  return (
    <div>
      {error.message}
      <button onClick={reset}>Try Again</button>
    </div>
  );
};

export default ErrorBoundary;