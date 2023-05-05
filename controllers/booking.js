import { Hotel } from "../model/hotel.js";
import { Room } from "../model/room.js";
import { Booking } from '../model/booking.js';
import { User } from "../model/user.js";
import mongoose from "mongoose";

class BookingHotel {
  getInformationHotel(req, res) {
    Hotel.find()
      .then((hotels) => {
        console.log("hotels", hotels);
        res.status(200).json({
          message: "ok",
          hotels: hotels,
        });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }

  getInformationRooms(req, res) {
    Room.find()
      .then((rooms) => {
        res.status(200).json({
          message: "ok",
          rooms: rooms,
        });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }

  postSearchHotel(req, res) {
    const where = req.body.where;
    const time = req.body.time;
    const numberOfPeople = req.body.numberOfPeople;
    Hotel.find()
      .populate('rooms')
      // .execPopulate() //return promise
      .then(hotels => {
        const place = where.toLowerCase();
        const result = hotels.filter(hotel => {
          try{
          const match = hotel.address.toLowerCase().includes(place);
          const number = hotel.rooms.some(room => room.maxPeople.toString() === numberOfPeople.toString())
          if(match && number) {
            return hotel;
          }
          }
          catch(err){
            console.log(err);
          }
        })
        return result;
      })
      .then((result) => {
        res.status(200).json({ message: "ok", result: result });
      })
      .catch(err => res.status(400).json({ message: err}))
  };

  // 6. Search hotel
  getDetailHotel (req, res) {
    const hotelId = req.params.hotelId;
    console.log('hotelId', hotelId)
    Hotel.findOne(hotelId)
      .then(hotel => {
        console.log('hotel', hotel)
        res.status(200).json({ message: 'ok', hotel: hotel })
      })
      .catch(err => res.status(400).json({ message: err}))
  };

  // 7. Create booking hotel
  postBookingHotel(req, res) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const identify = req.body.identify;
    const price = req.body.price;
    const roomNumber = req.body.roomNumber;
    const roomId = req.body.roomId;
    const payment = req.body.payment;
    User.findOne({ email: email.toString()})
      .then(user => {
        if(user) {
            user.fullName = fullName;
            user.phoneNumber = phoneNumber;
            user.identity = identify;
          return user.save();
        }
      })
      .then(user => {
        const booking = new Booking({
          startDate: startDate,
          endDate: endDate,
          price: price,
          status: 'checkIn',
          payment: payment,
          rooms: [
            {
              roomId: roomId,
              roomNumber: roomNumber
            }
          ],
          user: [
            {
              userId: user._id
            }
          ]
        });
        booking.save()
        .then(booking => {
          res.status(200).json({
            message: 'ok',
            booking: booking
          })
        })
        .catch(err => res.status(400).json({ message: err}))
      })
      .catch(err => res.status(400).json({ message: err}))
  };

  getTransactionWithId(req, res) {
    const userId = req.query.userId;
    // const id = new mongoose.Types.ObjectId(userId)
    Booking.find()
      .then(bookings => {
        try{
          console.log('transaction', bookings)
          const userBooking = bookings.filter(booking => {
            if(booking.user[0].userId.toString() === userId.toString()) {
              return booking;
            }
          });
          return userBooking;
        }catch(err) {
          console.log(err)
        }
      })
      .then(booking => {
        res.status(200).json({
          message: 'ok',
          lists: booking
        })
      })
      .catch(err => res.status(400).json({ message: err }))
  };

}

export const bookingController = new BookingHotel;
