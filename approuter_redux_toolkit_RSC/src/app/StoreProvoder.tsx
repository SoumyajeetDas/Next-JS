'use client';

import store from '@/lib/store';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
