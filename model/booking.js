import { Double } from 'bson';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rooms: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

export const Booking = new mongoose.model('Booing', schema);