import React from 'react';
import PostHeader from './post-header';
import classes from './post-content.module.css';
import ReactMarkdown from 'react-markdown';
import PostDataType from '@/@types/postData.type';
import Image from 'next/image';

// const DUMMY_POST = {
//   slug: 'getting-started-with-nextjs',
//   title: 'Getting Started with NextJS',
//   image: 'getting-started-nextjs.png',
//   excerpt:
//     "NextJS is a React framework that provides a great developer experience and many awesome features. In this article, you'll learn how to get started with it.",
//   date: '2022-02-10',
//   content: '# This is the first post',
// };
const PostContent: React.FC<{ postData: PostDataType }> = ({ postData }) => {
  const imagePath = `/images/posts/${postData?.slug}/${postData?.image}`;

  const customRenderers = {
    img(image: { src: string; alt: string }) {
      console.log('Data', postData.slug);
      return (
        <Image
          src={`/images/posts/${postData.slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={600}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={postData?.title} image={imagePath} />
      <h1>Hello</h1>
      <ReactMarkdown renderers={customRenderers}>
        {postData.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
