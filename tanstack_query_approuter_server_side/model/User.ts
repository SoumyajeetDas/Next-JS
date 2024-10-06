import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
});

const userModel =
  // User model is alredy present with schema of IUser
  (mongoose.models.User as mongoose.Model<IUser>) ||
  // Creating new model of IUser schema
  mongoose.model<IUser>('User', UserSchema);

export default userModel;
