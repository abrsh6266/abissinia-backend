import express from 'express';
import * as bookingController from '../controllers/admin/bookingController';

const router = express.Router();

// Routes for bookings
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.put('/bookings/:id', bookingController.updateBookingById);
router.delete('/bookings/:id', bookingController.deleteBookingById);

export default router;
