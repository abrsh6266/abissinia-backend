import { Request, Response, NextFunction } from 'express';
import MovieShow, { IMovieShow } from '../../models/MovieShow';

// Function to handle creating a new movie show
export const createMovieShow = async (req: Request, res: Response, next: NextFunction) => {
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
export const getAllMovieShows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieShows = await MovieShow.find();
    res.status(200).json(movieShows);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single movie show by ID
export const getMovieShowById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movieShow = await MovieShow.findById(id);
    if (!movieShow) {
      return res.status(404).json({ message: 'Movie show not found' });
    }
    res.status(200).json(movieShow);
  } catch (error) {
    next(error);
  }
};

// Function to find shows by movie ID
export const getMovieShowsByMovieId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { movieId } = req.params;
    const movieShows = await MovieShow.find({ movieId }).populate('movieId').populate('hallId');
    if (!movieShows || movieShows.length === 0) {
      return res.status(404).json({ message: 'No movie shows found for this movie ID' });
    }
    res.status(200).json(movieShows);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a movie show by ID
export const updateMovieShowById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedMovieShow = await MovieShow.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMovieShow) {
      return res.status(404).json({ message: 'Movie show not found' });
    }
    res.status(200).json(updatedMovieShow);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a movie show by ID
export const deleteMovieShowById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedMovieShow = await MovieShow.findByIdAndDelete(id);
    if (!deletedMovieShow) {
      return res.status(404).json({ message: 'Movie show not found' });
    }
    res.status(200).json({ message: 'Movie show deleted successfully' });
  } catch (error) {
    next(error);
  }
};
