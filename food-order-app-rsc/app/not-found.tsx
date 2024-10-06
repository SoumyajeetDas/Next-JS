import React from 'react';

// You cannot add metadata in not-founf.tsx file.
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Not Found',
//   description: "Sorry your resource couldn't be found 😒",
// };

const Notfound: React.FC = () => {
  return <div id="error">Sorry your resource couldn't be found 😒</div>;
};

export default Notfound;
