import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
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
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  featured: {
    type: Boolean,
    required: false
  },
  price: {
    type: Number,
    required: true
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
