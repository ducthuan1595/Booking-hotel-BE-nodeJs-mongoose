import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  roomNumbers: {
    type: Array,
    required: false
  },
  desc: {
    type: String,
    required: true
  },
  emptyRoom: {
    type: Number,
    required: true
  }
});

export const Room = mongoose.model('Room', schema);
