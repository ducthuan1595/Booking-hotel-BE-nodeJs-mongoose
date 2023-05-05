import { Double } from 'bson';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    }
  ],
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
  rooms: [
    {
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
      },
      roomNumber: [
        {
          type: Number,
          required: true
        }
      ]
    }
  ],
  status: {
    type: String,
    required: true
  }
});

export const Booking = new mongoose.model('Booing', schema);