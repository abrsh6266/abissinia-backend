import { Request, Response, NextFunction } from "express";
import Movie from "../../models/Movie";
import MovieShow from "../../models/MovieShow";

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
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Function to handle searching movies by name with pagination
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

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

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
      })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments({
      title: { $regex: name, $options: "i" },
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

