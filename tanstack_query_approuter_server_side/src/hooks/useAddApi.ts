import { addUser } from '@/actions/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => addUser(username),
    // onMutate: async (username) => {
    //   // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    //   await queryClient.cancelQueries({ queryKey: ['getUser'] });
    //   // Snapshot the previous value
    //   const previousUsers = queryClient.getQueryData(['getUser']);
    //   // Optimistically update to the new value
    //   queryClient.setQueryData(['getUser'], (old: any[]) => [...old, data]);
    //   // Return a context object with the snapshotted value
    //   return { previousUsers };
    // },
    // onError: (err, variables, context) => {
    //   // If there was an error, roll back to the snapshot
    //   if (context?.previousUsers) {
    //     queryClient.setQueryData(['getUser'], context.previousUsers);
    //   }
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['getUser'] });
    // },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUser'] });
    },
  });
};
