import React from 'react';
import classes from './featured-posts.module.css';
import PostsGrid from '@/components/posts/posts-grid';
import PostItem from '@/@types/postItem.type';

const FeaturedPosts: React.FC<{ posts: PostItem[] }> = (props) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>

      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default FeaturedPosts;
