'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './button';
import { X } from 'lucide-react';
import { IMessage } from '@/model/User';
import { useToast } from '@/hooks/use-toast';
import { IApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';

type MessageCardProps = {
  message: IMessage;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onMessageDelete,
}: MessageCardProps) => {
  const { toast } = useToast();
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<IApiResponse>(
        `/api/delete-message/${message._id}`,
      );

      if (response.data.success) {
        toast({
          title: 'Message deleted',
          description: 'Your message has been deleted',
        });
        onMessageDelete(message._id as string);
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<IApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message,
        variant: 'destructive',
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>Card Content</CardContent>
    </Card>
  );
};

export default MessageCard;
