import PostItemProps from '@/@types/postItem.type';
import FeaturedPosts from '@/components/home-page/featured-posts';
import Hero from '@/components/home-page/hero';
import { getFeaturedPosts } from '@/lib/post-util';
import Head from 'next/head';

type PostItemDataType = PostItemProps;

const Home: React.FC<{ posts: PostItemDataType[] }> = (props) => {
  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta name="description" content="Blog Post" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

// We will not use getSTaticProps here as the posts are not changing. If we use it the control will go through and read the markdown everytime
// and that will make our application more slower.
export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  const newFeaturedPosts: PostItemDataType[] = [];

  featuredPosts.forEach((post) => {
    newFeaturedPosts.push({
      slug: post.slug,
      title: post.title,
      image: post.image,
      excerpt: post.excerpt,
      date: post.date,
    });
  });

  return {
    props: {
      posts: newFeaturedPosts,
    },

    // Will not use revalidate here beacuse I want this page to be executed only during the build time and I take into consideration that
    // the posts will not change thereafter.
    // revalidate: 60,
  };
}

export default Home;
