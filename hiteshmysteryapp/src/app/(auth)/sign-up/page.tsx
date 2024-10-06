'use client';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas/signUpSchema';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { IApiResponse } from '@/types/ApiResponse';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const router = useRouter();

  /***** Without useDebounce *****/
  // Here when user presses a key the username will be updated. But we don't want that on every key press of the user, which will ultimately update the
  // username to call the api, rather to wait for 500ms and then call. So the hook useDebounceValue what it does it will update the debouncedUsername
  // after 500ms of no key press.
  // const [debouncedUsername, setDebouncedUsername] = useDebounceValue('', 500);

  /***** With useDebounceCallback *****/
  const debouncedUsername = useDebounceCallback(setUsername, 500);

  const { toast } = useToast();

  // Zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  /***** Without useDebounce *****/

  // useEffect(() => {
  //   const checkUsernameUnique = async () => {
  //     if (debouncedUsername) {
  //       setIsCheckingUsername(true);
  //       setUsernameMessage('');

  //       try {
  //         const response = await axios.get(
  //           `/api/check-username-unique?username=${debouncedUsername}`,
  //         );

  //         setUsernameMessage(response.data.message);
  //       } catch (error) {
  //         const axiosError = error as AxiosError<IApiResponse>;
  //         setUsernameMessage(
  //           axiosError.response?.data.message ?? 'Error checkig username',
  //         );
  //       } finally {
  //         setIsCheckingUsername(false);
  //       }
  //     }
  //   };

  //   checkUsernameUnique();
  // }, [debouncedUsername]);

  /***** With useDebounceCallback *****/
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage('');

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`,
          );

          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<IApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checkig username',
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmiting(true);

    try {
      const response = await axios.post<IApiResponse>('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      // replace will not add the url in history stack
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error('Error signing up', error);

      const axiosError = error as AxiosError<IApiResponse>;

      toast({
        title: 'Error',
        description: axiosError.response?.data.message ?? 'Error signing up',
        variant: 'destructive',
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      onChange={(e) => {
                        // Without useDebounce
                        // setDebouncedUsername(e.target.value);

                        // With useDebounceCallback
                        debouncedUsername(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}

                  <p
                    className={`text-sm ${
                      usernameMessage === 'Username available'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmiting}>
              {isSubmiting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                'Signup'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
