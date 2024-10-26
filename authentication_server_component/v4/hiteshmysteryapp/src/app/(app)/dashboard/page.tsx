'use client';

import { Button } from '@/components/ui/button';
import MessageCard from '@/components/ui/MessageCard';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { IMessage } from '@/model/User';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { IApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Page = () => {
  // setMassagesand setIsLoading are stable functions and it's reference doesn't gets changed between renders. And that's the reason
  // can be used in the callback
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  // useSession will be refetched on window focus. To stop that we added refetchOnWindowFocus={false} with SessionProvider in AuthProvider.tsx

  // 1st Way
  // const { data: session, status } = useSession({
  //   required:true,
  //   onUnauthenticated() {
  //       redirect('/sign-in');
  //   },
  // });

  // 2nd Way
  const { data: session, status } = useSession();

  // setValue is a stable function and it's reference doesn't gets changed between renders. And that's the reason can be used in
  // the calback
  const { register, watch, setValue } = useForm<
    z.infer<typeof acceptMessageSchema>
  >({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      isAcceptingMessage: false,
    },
  });

  // When you use watch, it will re-render the component whenever the watched value changes. If you are watching a value like isAcceptingMessage, the
  // component will re-render whenever isAcceptingMessage changes.
  const acceptMessages = watch('isAcceptingMessage');

  // fetchMessage is kept under a callback and in the dependency array there is setValue. This is because setValue is a stable function and it's reference
  // doesn't gets changed between renders. This means the there will be no new instance of the fetchAcceptMessages will be created again and again when
  // the watch('isAcceptingMessage') is triggered everytime because that re renders the component. If we don't use useCallback, then a new instance
  // will be created again and again and that will execute the useEffect again and again as fetcheAcceptMessages fuction reference is present in
  // useEffect dependency array and the reference of the fetchAcceptMessages will be changed.
  const fetchAcceptMessages = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get<IApiResponse>('/api/accept-messages');
      setValue(
        'isAcceptingMessage',
        response.data.isAcceptingMessages as boolean,
      );
    } catch (error) {
      const axiosError = error as AxiosError<IApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
    // setValue is a stable function and it's reference doesn't gets changed between renders. And that's the reason can be used in
    // the calback

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  // fetchMessages is kept under a callback and in the dependency array there is setIsLoading, setMessages. This is because setValue is a stable
  // function and it's reference doesn't gets changed between renders. This means the there will be no new instance of the fetchMessages will be
  // created again and again when the watch('isAcceptingMessage') is triggered everytime because that re renders the component. If we don't use
  // useCallback, then a new instance will be created again and again and that will execute the useEffect again and again as fetchMessages fuction
  // reference is present in useEffect dependency array and the reference of the fetchMessages will be changed.
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);

      try {
        const response = await axios.get<IApiResponse>('/api/get-messages');
        setMessages((response.data.messages as IMessage[]) || []);

        if (refresh) {
          toast({
            title: 'Refreshed Messages',
            description: 'Showing you the latest messages',
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>;
        toast({
          title: 'Error',
          description:
            axiosError.response?.data.message ?? 'Failed to fetch messages',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setIsLoading, setMessages],
  );

  // As the useEffect dependency array has fetchMessages, fetchAcceptMessages, setValue all are stable functions and their reference doesn't gets changed
  // between renders. The session will also not change. And that's the reason this useEffect will only be executed when the component is just mounted.
  useEffect(() => {
    // If there is no session or user, just make the control out of the flow
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchMessages, fetchAcceptMessages]);

  // So, in a way it became like a useEffect with empty dependency array.

  // useEffect(() => {
  //   // If there is no session or user, just make the control out of the flow
  //   if (!session || !session.user) return;

  //   fetchMessages();
  //   fetchAcceptMessages();
  // }, []);

  // Handle switch change
  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.post<IApiResponse>('/api/accept-messages', {
        acceptMessage: !acceptMessages,
      });

      setValue('isAcceptingMessage', !acceptMessages);

      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<IApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to update message acceptance',
        variant: 'destructive',
      });
    }
  };

  let profileUrl = '';

  if (typeof window !== 'undefined') {
    profileUrl = `${window.location.origin}/profile/u/${session?.user.username}`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'Copied to clipboard',
      description: 'Your unique link has been copied to your clipboard',
    });
  };

  if (status === 'loading') return <div>Authentication on the process...</div>;

  if (!session || !session.user) return <div>Please login to continue</div>;

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('isAcceptingMessage')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
