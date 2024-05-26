import { Request, Response, NextFunction } from "express";
import Movie, { IMovie } from "../../models/Movie";

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

// Function to handle fetching all movies
export const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await Movie.find().populate("starsId").populate("reviewId");
    res.status(200).json(movies);
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
      .populate("reviewId");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a movie by ID
export const updateMovieById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true }).populate('starsId').populate('reviewId');
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
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
