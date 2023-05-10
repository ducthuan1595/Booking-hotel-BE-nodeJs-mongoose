import { Hotel } from "../model/hotel.js";
import { Room } from "../model/room.js";
import { Booking } from '../model/booking.js';
import { User } from "../model/user.js";
import mongoose from "mongoose";

class BookingHotel {
  getInformationHotel(req, res) {
    Hotel.find()
      .then((hotels) => {
        // console.log("hotels", hotels);
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
    const numberOfRoom = req.body.numberOfRoom;
    Hotel.find()
      .populate('rooms')
      // .execPopulate() //return promise
      .then(hotels => {
        const place = where.toLowerCase();
        // console.log(numberOfPeople);
        const result = hotels.filter(hotel => {
          try{
            const match = hotel.address.toLowerCase().includes(place);
            const numbers = hotel.rooms.some(room => room.maxPeople >= +numberOfPeople);
            const rooms = hotel.rooms.some(room => room.emptyRoom >= numberOfRoom);
            // console.log('number', numbers);
            if(match && numbers && rooms) {
              return hotel;
            }
            // return 'Not found hotel!';
          }
          catch(err){
            console.log(err);
          }
        });
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
    // console.log('hotelId', hotelId)
    Hotel.findById(hotelId)
      .populate('rooms')
      .then(hotel => {
        // console.log('hotel', hotel)
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
    const rooms = req.body.rooms;
    const payment = req.body.payment;
    const hotelId = req.body.hotelId;
    User.findOne({ email: email })
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
          status: 'booked',
          payment: payment,
          rooms: rooms,
          userId: user._id,
          hotelId: hotelId
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
    const userId = req.params.userId;
    Booking.find()
      .populate('hotelId')
      .then(bookings => {
        try{
          const userBooking = bookings.filter(booking => {
            if(booking.userId.toString() === userId.toString()) {
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
