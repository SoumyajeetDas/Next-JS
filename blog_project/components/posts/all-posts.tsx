import React from 'react';
import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';
import PostItemProps from '@/@types/postItem.type';

const AllPosts: React.FC<{ posts: PostItemProps[] }> = (props) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default AllPosts;
