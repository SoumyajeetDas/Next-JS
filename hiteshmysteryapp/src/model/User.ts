import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: IMessage[];
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: { type: String, required: [true, 'Password is required'] },
  verifyCode: { type: String, required: [true, 'Verify Code is required'] },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: { type: Boolean, default: false },
  isAcceptingMessage: { type: Boolean, default: false },
  messages: [MessageSchema],
});

const userModel =
  // User model is alredy present with schema of IUser
  (mongoose.models.User as mongoose.Model<IUser>) ||
  // Creating new model of IUser schema
  mongoose.model<IUser>('User', UserSchema);

export default userModel;
