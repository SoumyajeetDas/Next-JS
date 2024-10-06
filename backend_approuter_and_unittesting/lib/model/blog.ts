import { model, models, ObjectId, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  description: string;
  user: ObjectId;
  category: ObjectId;
}

const BlogSchema: Schema<IBlog> = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
  },
  { timestamps: true },
);

const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);

export default Blog;
