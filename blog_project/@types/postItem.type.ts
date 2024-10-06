import PostDataType from './postData.type';

type PostItemProps = Omit<PostDataType, 'isFeatured' | 'content'>;

export default PostItemProps;
