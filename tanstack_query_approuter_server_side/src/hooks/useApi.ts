import { getUser } from '@/actions/user';
import { useQuery } from '@tanstack/react-query';

export const useApi = () => {
  return useQuery({
    queryKey: ['getUser'],
    // It's not mandate you have to pass server action in query fn. We can also use normal function and pass it here.
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 3,
  });
};
