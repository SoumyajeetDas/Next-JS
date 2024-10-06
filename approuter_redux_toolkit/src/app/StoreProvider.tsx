'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';

// In this example code we are ensuring that this client component is re-render safe by checking the value of the reference to ensure that the
// store is only created once. This component will only be rendered once per request on the server, but might be re-rendered multiple times on the
//  client if there are stateful client components located above this component in the tree, or if this component also contains other mutable state
//  that causes a re-render.
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  // This will work when current is undefined. On the first render of both client and server component it will be undefined.
  // On the second render of the client component it will be defined and the store will not be created.
  // If we keep the StoreProvider wrapped in the root layout.tsx file it's advantage can't be understood. But say if we are wrapping it for
  // page component, whenever you visit the page component this StoreProvider also will get rendered. On the first render this will make the store
  // but from the second render the store will not be created as the ref will have the preserved value untill you have refreshed the application.
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
