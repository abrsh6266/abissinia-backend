import { Request, Response, NextFunction } from "express";
import MovieShow, { IMovieShow } from "../../models/MovieShow";
import Booking from "../../models/Booking";
import Order from "../../models/Order";
import mongoose from "mongoose";

// Function to handle creating a new movie show
export const createMovieShow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { showTime, movieId, hallId } = req.body;
    const newMovieShow = new MovieShow({
      showTime,
      movieId,
      hallId,
    });
    const savedMovieShow = await newMovieShow.save();
    res.status(201).json(savedMovieShow);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all movie shows
export const getAllMovieShows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieShows = await MovieShow.find();
    res.status(200).json(movieShows);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single movie show by ID
export const getMovieShowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const movieShow = await MovieShow.findById(id);
    if (!movieShow) {
      return res.status(404).json({ message: "Movie show not found" });
    }
    res.status(200).json(movieShow);
  } catch (error) {
    next(error);
  }
};

// Function to find shows by movie ID
export const getMovieShowsByMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { movieId } = req.params;
    const movieShows = await MovieShow.find({ movieId })
      .populate("movieId")
      .populate("hallId");
    if (!movieShows || movieShows.length === 0) {
      return res
        .status(404)
        .json({ message: "No movie shows found for this movie ID" });
    }
    res.status(200).json(movieShows);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a movie show by ID
export const updateMovieShowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedMovieShow = await MovieShow.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovieShow) {
      return res.status(404).json({ message: "Movie show not found" });
    }
    res.status(200).json(updatedMovieShow);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a movie show by ID
export const deleteMovieShowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Find and delete the movie show
    const deletedMovieShow = await MovieShow.findByIdAndDelete(id).session(
      session
    );
    if (!deletedMovieShow) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Movie show not found" });
    }

    // Find related bookings
    const bookings = await Booking.find({ movieShowId: id }).session(session);

    // Delete related orders
    for (const booking of bookings) {
      if (booking.order) {
        await Order.findByIdAndDelete(booking.order).session(session);
      }
    }

    // Delete related bookings
    await Booking.deleteMany({ movieShowId: id }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({
        message: "Movie show and related dependencies deleted successfully",
      });
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
