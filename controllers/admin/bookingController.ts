import { Request, Response, NextFunction } from 'express';
import Booking from '../../models/Booking';
import User from '../../models/User';
import MovieShow from '../../models/MovieShow';
import Order from '../../models/Order';

// Function to handle creating a new booking
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingDate, userId, movieShowId, order, seats, price } = req.body;
    const newBooking = new Booking({
      bookingDate,
      userId,
      movieShowId,
      order,
      seats,
      price
    });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all bookings
export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('movieShowId', 'showTime movieId hallId')
      .populate('order', 'snacks price');
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single booking by ID
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate('userId', 'name email')
      .populate('movieShowId', 'showTime movieId hallId')
      .populate('order', 'snacks price');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a booking by ID
export const updateBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true })
      .populate('userId', 'name email')
      .populate('movieShowId', 'showTime movieId hallId')
      .populate('order', 'snacks price');
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a booking by ID
export const deleteBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching bookings by user ID
export const getBookingsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId })
      .populate('userId', 'name email')
      .populate('movieShowId', 'showTime movieId hallId')
      .populate('order', 'snacks price');
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
