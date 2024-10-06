import { getUser } from '@/actions/user';
import Users from '@/components/Users';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

const ShowUser = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser(),
  });

  console.log('Prefetching done', dehydrate(queryClient));

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users />
    </HydrationBoundary>
  );
};

export default ShowUser;
