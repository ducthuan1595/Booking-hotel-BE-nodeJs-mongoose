import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  identity: {
    type: String,
    required: false
  }
});

export const User = mongoose.model('User', schema);
