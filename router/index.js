import express from 'express';

import { userController } from '../controllers/user.js';
import { bookingController } from '../controllers/booking.js';
import { adminController } from '../controllers/admin.js';

const router = express.Router();

const initial = (app) => {

  // Users
  router.post('/sign-up', userController.addUser);
  router.post('/sign-in', userController.signIn);
  router.get('/get-current-user', userController.getUserCurrent);
  // router.post('/admin/sign-in', userController.adminSignIn);
  router.get('/get-all-user', userController.getAllUser);

  // Booking
  router.get('/get-all-hotel', bookingController.getInformationHotel);
  router.get('/inform-room', bookingController.getInformationRooms);
  router.post('/search-hotel', bookingController.postSearchHotel);
  router.get('/detail-hotel/:hotelId', bookingController.getDetailHotel);
  router.post('/book-hotel', bookingController.postBookingHotel)
  router.get('/get-transaction/:userId', bookingController.getTransactionWithId);
  
  // Admin
  router.post('/admin/sign-in', adminController.signIn);
  router.get('/admin/get-all-transaction', adminController.getAllTransaction);
  router.get('/admin/get-all-room', adminController.getAllRooms)
  router.post('/admin/delete-hotel', adminController.deleteHotelWithId);
  router.post('/admin/add-hotel', adminController.addHotel);
  router.post('/admin/add-room', adminController.addRooms);
  router.post('/admin/delete-room', adminController.deleteRoomWithId);
  router.get('/admin/get-edit-hotel/:hotelId', adminController.getEditHotel);
  router.get('/admin/get-edit-room/:roomId', adminController.getEditRoom);
  router.post('/admin/edit-hotel', adminController.editHotelWithId);
  router.post('/admin/edit-room', adminController.editRoomWithId);

  return app.use('/', router);
};

export default initial;