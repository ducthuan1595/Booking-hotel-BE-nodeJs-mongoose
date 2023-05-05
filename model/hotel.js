import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  photos: {
    type: Array,
    required: false
  },
  desc: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: false
  },
  featured: {
    type: Boolean,
    required: false
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    }
  ]
});

export const Hotel = mongoose.model('Hotel', schema);
