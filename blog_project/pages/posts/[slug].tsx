import PostDataType from '@/@types/postData.type';
import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/lib/post-util';
import Head from 'next/head';
import React from 'react';

const PostDetailPage: React.FC<{ post: PostDataType }> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostContent postData={post} />
    </>
  );
};

export function getStaticProps(context: { params: { slug: string } }) {
  const { slug } = context.params;

  const postData = getPostData(slug);

  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: postData,
    },
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    // As there are less pages and we know what are the pages that will begetting created depending on the markdown, so we would like
    // to have a fallback: false
    fallback: false,
  };
}

export default PostDetailPage;
