// This is a sever component that will be executed on the server side.
// Contains the Server Action

'use server';

import { revalidatePath } from 'next/cache';
import { uploadImage } from './cloudinary';
import { storePost, updatePostLikeStatus } from './posts';
import { redirect } from 'next/navigation';

const isInvalidText = (text: string | null | undefined) =>
  !text || text.trim().length === 0;

export const submitHandler = async (_prevState: any, formData: FormData) => {
  const feedData = {
    title: formData.get('title') as string,
    image: formData.get('image') as File,
    content: formData.get('content') as string,
  };

  if (
    isInvalidText(feedData.title) ||
    isInvalidText(feedData.content) ||
    !feedData.image ||
    feedData.image.size === 0
  ) {
    return {
      message: {
        title: isInvalidText(feedData.title) ? 'Title is required' : '',
        content: isInvalidText(feedData.content) ? 'Content is required' : '',
        image:
          feedData.image.size === 0 || !feedData.image
            ? 'Image is required'
            : '',
      },
    };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(feedData.image);
  } catch (error) {
    throw new Error('Failed to add image in cloudinary. The error is' + error);
  }

  await storePost({
    userId: '1',
    title: feedData.title,
    imageUrl: imageUrl,
    content: feedData.content,
  });

  revalidatePath('/', 'layout');

  redirect('/feed');
};

// postId is an extra parameter other then prevState and formData.

export const toggleLikeHandler = async (postId: string) => {
  if (!postId) {
    throw new Error('Failed to like post. Post ID is missing');
  }
  updatePostLikeStatus(postId, 2);

  revalidatePath('/feed');
};

// If u have wanred the same function to take the formData you would written the function like this:
// export const toggleLikeHandler = async (postId: string, formData: FormData) => {}
