// error.tsx needs to always client component because it not only handles errors from server side but also client side.

"use client";

import React from "react";

const error = ({ error }: { error: Error }) => {
  return (
    <div id="error">
      <h1>An error occurred</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default error;
