'use client';

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { toggleLikeHandler } from '@/lib/action';
import { useOptimistic } from 'react';
import Image from 'next/image';

const Post: React.FC<{
  post: any;
  action: (postId: string) => Promise<void>;
}> = ({ post, action }) => {
  return (
    <article className="post">
      <div className="post-image">
        {/* As we don't know the configuration of the Image component, we can't
        pass the fill prop to it. // Image blocks the url of the image so we
        need to configure the domain in next.config.mjs // Whe we put the fill
        prop it takes the whole screen. SO we have to put the container of the
        image as postion:relative. // Here the class post-image is relative. */}
        <Image src={post.image} alt={post.title} fill />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on &nbsp;
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            {/* Without useOptimistic() */}
            {/* <form
              // bind is uded to pass extra parameter to the server action.
              action={likeHandler.bind(null, post?.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form> */}

            {/* With useOptimistic()*/}
            <form
              // bind is uded to pass extra parameter to the server action.
              action={action.bind(null, post?.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
};

const Posts: React.FC<{ posts: any[] }> = ({ posts }) => {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      // Find the index of the post to be updated
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId,
      );

      // If the post is not found, return the previous posts
      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      // Create a new post object with the updated likes and isLiked values
      const updatedPosts = { ...prevPosts[updatedPostIndex] };

      // Update the likes and isLiked values
      updatedPosts.likes = updatedPosts.likes + (updatedPosts.isLiked ? -1 : 1);
      updatedPosts.isLiked = !updatedPosts.isLiked;

      // Create a new array with the updated post object
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPosts;

      // Return the new array
      return newPosts;
    },
  );

  // Async function can be created in client component but async fuctional componenet is not allowed.
  async function optimisticallyUpdatePosts(postId: string) {
    updateOptimisticPosts(postId);
    await toggleLikeHandler(postId);
  }

  // Without optimistic update
  // if (!posts || posts.length === 0) {
  //   return <p>There are no posts yet. Maybe start sharing some?</p>;

  // }

  // With optimistic update
  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  // Without optimistic update
  // return (
  //   <ul className="posts">
  //     {posts.map((post) => (
  //       <li key={post.id}>
  //         <Post post={post} />
  //       </li>
  //     ))}
  //   </ul>
  // );

  // With optimistic update
  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={optimisticallyUpdatePosts} />
        </li>
      ))}
    </ul>
  );
};

export default Posts;
