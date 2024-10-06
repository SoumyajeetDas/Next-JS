import PostItemProps from '@/@types/postItem.type';
import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/lib/post-util';
import Head from 'next/head';
import React from 'react';

type PostItemDataType = PostItemProps;

const AllPostPage: React.FC<{ posts: PostItemDataType[] }> = (props) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of programming related blog posts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AllPosts posts={props.posts} />
    </>
  );
};

// We will not use getSTaticProps here as the posts are not changing. If we use it the control will go through and read the markdown everytime
// and that will make our application more slower.
export function getStaticProps() {
  const featuredPosts = getAllPosts();

  const allFeaturedPosts: PostItemDataType[] = [];

  featuredPosts.forEach((post) => {
    allFeaturedPosts.push({
      slug: post.slug,
      title: post.title,
      image: post.image,
      excerpt: post.excerpt,
      date: post.date,
    });
  });

  return {
    props: {
      posts: allFeaturedPosts,
    },

    // Will not use revalidate here beacuse I want this page to be executed only during the build time and I take into consideration that
    // the posts will not change thereafter.
    // revalidate: 60,
  };
}

export default AllPostPage;
