import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  // This timestamps object will automatically add createdAt and updatedAt fields to the schema
  { timestamps: true },
);

const User =
  // User model is alredy present with schema of IUser
  (mongoose.models.User as mongoose.Model<IUser>) ||
  // Creating new model of IUser schema
  mongoose.model<IUser>('User', UserSchema);

export default User;
