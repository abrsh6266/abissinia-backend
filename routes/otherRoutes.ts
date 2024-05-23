import express from 'express';
import * as bookingController from '../controllers/admin/bookingController';
import * as hallController from '../controllers/admin/hallController';
import * as movieController from '../controllers//admin/movieController';

const router = express.Router();

// Routes for bookings
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.put('/bookings/:id', bookingController.updateBookingById);
router.delete('/bookings/:id', bookingController.deleteBookingById);


// Routes for halls
router.post('/halls', hallController.createHall);
router.get('/halls', hallController.getAllHalls);
router.get('/halls/:id', hallController.getHallById);
router.put('/halls/:id', hallController.updateHallById);
router.delete('/halls/:id', hallController.deleteHallById);


// Routes for movies
router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.getAllMovies);
router.get('/movies/:id', movieController.getMovieById);
router.put('/movies/:id', movieController.updateMovieById);
router.delete('/movies/:id', movieController.deleteMovieById);

export default router;
