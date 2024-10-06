import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

const FeedPage: React.FC = async () => {
  const posts = await getPosts(5);
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
};

export default FeedPage;
