import { Booking } from "../model/booking.js";
import { Hotel } from "../model/hotel.js";
import { Room } from "../model/room.js";
import { User } from "../model/user.js";

class Admin {
  signIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.find()
      .then((users) => {
        console.log(users);
        const findUser = users.filter((user) => {
          if (
            user.isAdmin &&
            user.email === email &&
            user.password === password
          ) {
            return user;
          }
        });
        // console.log(findUser.length === 0);
        if (findUser.length !== 0) {
          res.status(200).json({
            message: "ok",
            user: findUser,
          });
        } else {
          res.status(400).json({ message: "Invalid user!" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }

  // 9. Authentication admin
  getAllTransaction(req, res) {
    const quantity = req.query.quantity;
    Booking.find()
      .populate("userId")
      .populate("hotelId")
      .then((books) => {
        if (quantity !== 'undefined') {
          const booking = books.reverse().slice(0, quantity);
          return booking;
        } else {
          return books;
        }
      })
      .then((books) => [res.status(200).json({ message: "ok", books: books })])
      .catch((err) => res.status(400).json({ message: err }));
  }

  getAllRooms(req, res) {
    Room.find()
      .then((rooms) => {
        res.status(200).json({ message: "ok", rooms: rooms });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }

  // CRUD hotel
  addHotel(req, res) {
    const name = req.body.name;
    const city = req.body.city;
    const address = req.body.address;
    const desc = req.body.desc;
    const price = req.body.price;
    const distance = req.body.distance;
    const photos = req.body.photos;
    const type = req.body.type;
    const rooms = req.body.rooms;
    const featured = req.body.featured;
    const title = req.body.title;
    const hotel = new Hotel({
      name: name,
      city: city,
      address: address,
      desc: desc,
      cheapestPrice: parseInt(price),
      distance: distance,
      photos: photos,
      type: type,
      price: price,
      rooms: rooms,
      featured: featured == 1 ? true : false,
      title: title,
    });
    hotel
      .save()
      .then((hotel) => {
        res.status(200).json({ message: "ok", hotel: hotel });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }

  deleteHotelWithId(req, res) {
    const hotelId = req.body.hotelId;
    console.log(hotelId);
    Booking.find()
      .then((books) => {
        const findHotel = books.some(
          (book) => book.hotelId.toString() === hotelId.toString()
        );
        if (!findHotel) {
          Hotel.findByIdAndDelete(hotelId).then((hotel) => {
            res.status(200).json({ message: "ok", hotel: hotel });
          });
        } else {
          res.status(200).json({ message: "Sorry, The hotel has been booked" });
        }
      })

      .catch((err) => res.status(400).json({ message: err }));
  }

  // 11. Add rooms
  addRooms(req, res) {
    const title = req.body.title;
    const maxPeople = req.body.maxPeople;
    const roomNumbers = req.body.roomNumbers;
    const desc = req.body.desc;
    const price = req.body.price;
    // const hotelId = req.body.hotelId;
    // Hotel.find()
    //   .then(hotels => {
    //     let newArr = [];
    //     for(let i = 0; i < hotelId.length; i++) {
    //       for(let j = 0; j < hotels.length; j++) {
    //         if(hotelId[i].toString() === hotels[j]._id.toString()) {
    //           newArr.push(hotels[j]);
    //         }
    //       }
    //     };
    //     console.log('hotel', newArr);
    //   })
    const room = new Room({
      title: title,
      roomNumbers: roomNumbers,
      desc: desc,
      price: parseInt(price),
      maxPeople: parseInt(maxPeople),
      emptyRoom: parseInt(roomNumbers.length),
    });
    room.save()
      .then((room) => {
        res.status(200).json({ message: "ok", room: room });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }

  deleteRoomWithId(req, res) {
    const roomId = req.body.roomId;
    console.log(roomId);
    Booking.find()
      .then((books) => {
        const isBooked = books.some((book) =>
          book.rooms.find((room) => {
            if (room.roomId.toString() === roomId.toString()) {
              return true;
            }
          })
        );
        console.log('find', isBooked);
        return isBooked;
      })
      .then((isBooked) => {
        if (!isBooked) {
          Room.findByIdAndDelete(roomId)
            .then((room) => {
              res.status(200).json({ message: "ok", room: room });
            })
            .catch((err) => res.status(400).json({ message: err }));
        } else {
          res.status(200).json({ message: "The room is currently booked!" });
        }
      })
      .catch((err) => res.status(400).json({ message: err }));
  };

  getEditHotel(req, res) {
    const hotelId = req.params.hotelId;
    Hotel.findById(hotelId)
      .then(hotel => {
        res.status(200).json({ message: 'ok', hotel: hotel })
      })
      .catch(err => res.status(400).json({ message: err }))
  }

  // 13 Advance edit
  editHotelWithId(req, res) {
    const hotelId = req.body.hotelId;
    const name = req.body.name;
    const city = req.body.city;
    const address = req.body.address;
    const desc = req.body.desc;
    const price = req.body.price;
    const distance = req.body.distance;
    const photos = req.body.photos;
    const type = req.body.type;
    const rooms = req.body.rooms;
    const featured = req.body.featured;
    const title = req.body.title;
    Hotel.findById(hotelId)
      .then((hotel) => {
        hotel.name = name;
        hotel.city = city;
        hotel.address = address;
        hotel.desc = desc;
        hotel.cheapestPrice = parseInt(price);
        hotel.distance = distance;
        hotel.photos = photos;
        hotel.type = type;
        hotel.rooms = rooms;
        hotel.featured = featured;
        hotel.title = title;
        hotel.rating = 5.0;
        return hotel.save();
      })
      .then((hotel) => {
        res.status(200).json({ message: "ok", hotel: hotel });
      })
      .catch((err) => res.status(400).json({ message: err }));
  };

  getEditRoom(req, res) {
    const roomId = req.params.roomId;
    Room.findById(roomId)
      .then(room => {
        res.status(200).json({ message: 'ok', room: room })
      })
      .catch(err => res.status(400).json({message: err}))
  };

  editRoomWithId(req, res) {
    const roomId = req.body.roomId;
    const title = req.body.title;
    const maxPeople = req.body.maxPeople;
    const roomNumbers = req.body.roomNumbers;
    const desc = req.body.desc;
    const price = req.body.price;
    console.log(typeof parseInt(price));
    Room.findById(roomId)
      .then((room) => {
        room.title = title;
        room.roomNumbers = roomNumbers;
        room.desc = desc;
        room.price = parseInt(price);
        room.maxPeople = parseInt(maxPeople);
        return room.save();
      })
      .then((room) => {
        res.status(200).json({ message: "ok", room: room });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }
}

export const adminController = new Admin();
