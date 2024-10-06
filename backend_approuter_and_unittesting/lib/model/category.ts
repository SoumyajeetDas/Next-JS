import { model, models, Schema } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  user: ObjectId;
}

const CategorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: true,
    },
    // This will contain the user id of the user who created the category
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Category =
  models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
