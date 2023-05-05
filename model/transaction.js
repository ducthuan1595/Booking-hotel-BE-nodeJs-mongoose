import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  hotel: {
    name: {
      type: String,
      required: true
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    }
  },
  room: {
    name: {
      type: String,
      required: true
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    }
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

export const Transaction = mongoose.model('Transaction', schema);
