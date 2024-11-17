'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const DevT: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

export default DevT;
