import { Request, Response, NextFunction } from "express";
import Movie from "../../models/Movie";
import MovieShow from "../../models/MovieShow";
import mongoose from "mongoose";
import Order from "../../models/Order";
import Review from "../../models/Review";
import Booking from "../../models/Booking";

// Function to handle creating a new movie
export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      duration,
      genre,
      country,
      starsId,
      releaseDate,
      description,
      poster,
      reviewId,
    } = req.body;
    const newMovie = new Movie({
      title,
      duration,
      genre,
      country,
      starsId,
      releaseDate,
      description,
      poster,
      reviewId,
      averageRating: 0, // Initialize averageRating to 0
    });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all movies with pagination
export const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .populate("starsId")
      .populate({
        path: "reviewId",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalMovies,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single movie by ID
export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id)
      .populate("starsId")
      .populate({
        path: "reviewId",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a movie by ID
export const updateMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("starsId")
      .populate({
        path: "reviewId",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a movie by ID
export const deleteMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Find and delete the movie
    const deletedMovie = await Movie.findByIdAndDelete(id).session(session);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Delete related MovieShow documents
    await MovieShow.deleteMany({ movieId: id }).session(session);

    // Delete related Order documents
    await Order.deleteMany({ movieId: id }).session(session);

    // Delete related Review documents
    await Review.deleteMany({ movieId: id }).session(session);

    // Find related MovieShow documents to get their IDs
    const movieShows = await MovieShow.find({ movieId: id }).session(session);

    // Extract movieShow IDs
    const movieShowIds = movieShows.map((show) => show._id);

    // Delete related Booking documents
    await Booking.deleteMany({ movieShowId: { $in: movieShowIds } }).session(
      session
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Movie and related dependencies deleted successfully" });
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// Function to handle searching movies by name (partial and case-insensitive)
export const searchMoviesByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Name query parameter is required" });
    }
    const movies = await Movie.find({
      title: { $regex: name, $options: "i" },
    })
      .populate("starsId")
      .populate({
        path: "reviewId",
        populate: {
          path: "userId",
          model: "User",
        },
      });

    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching recently released movies with pagination
export const getRecentlyReleasedMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recentDays = 700; // Define the period for recent releases
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - recentDays);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find({
      releaseDate: { $gte: recentDate },
    })
      .populate("starsId")
      .populate({
        path: "reviewId",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments({
      releaseDate: { $gte: recentDate },
    });
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalMovies,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

export const initializeAverageRatings = async () => {
  const movies = await Movie.find();
  for (const movie of movies) {
    const result = await Review.aggregate([
      { $match: { movieId: movie._id } },
      { $group: { _id: "$movieId", averageRating: { $avg: "$rating" } } },
    ]);
    const averageRating = result.length > 0 ? result[0].averageRating : 0;
    await Movie.findByIdAndUpdate(movie._id, { averageRating });
  }
  console.log("Average ratings initialized for all movies.");
};

export const updateAverageRating = async (movieId: mongoose.Types.ObjectId) => {
  const result = await Review.aggregate([
    { $match: { movieId: new mongoose.Types.ObjectId(movieId) } },
    { $group: { _id: "$movieId", averageRating: { $avg: "$rating" } } },
  ]);
  const averageRating = result.length > 0 ? result[0].averageRating : 0;
  await Movie.findByIdAndUpdate(movieId, { averageRating });
};

// Function to handle fetching movies that are scheduled with pagination
export const getScheduledMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const movieShows = await MovieShow.find()
      .populate({
        path: "movieId",
        populate: {
          path: "starsId reviewId",
        },
      })
      .skip(skip)
      .limit(limit);

    const totalMovieShows = await MovieShow.countDocuments();
    const totalPages = Math.ceil(totalMovieShows / limit);

    const movies = movieShows.map((show) => show.movieId);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalMovies: totalMovieShows,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching movies by genre with pagination
export const getMoviesByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { genre } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    if (!genre) {
      return res
        .status(400)
        .json({ message: "Genre query parameter is required" });
    }

    const movies = await Movie.find({ genre })
      .populate("starsId")
      .populate({
        path: "reviewId",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments({ genre });
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalMovies,
      movies,
    });
  } catch (error) {
    next(error);
  }
};
