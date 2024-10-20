import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    required: [true, 'Please provide a name'],
    type: String,
  },
  password: {
    required: [true, 'Please provide a password'],
    type: String,
  },
  email: {
    required: [true, 'Please provide an email'],
    type: String,
  },
});

// Mongoose will automatically modify User to plural and lowercas User -> users while creating the DB
export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
