import { Request, Response } from 'express';
import MovieRequest from '../models/MovieRequest';

// Create a new movie request
export const createMovieRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMovieRequest = new MovieRequest(req.body);
    const savedMovieRequest = await newMovieRequest.save();
    res.status(201).json(savedMovieRequest);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get all movie requests
export const getAllMovieRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieRequests = await MovieRequest.find();
    res.status(200).json(movieRequests);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get a single movie request by ID
export const getMovieRequestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieRequest = await MovieRequest.findById(req.params.id);
    if (!movieRequest) {
      res.status(404).json({ error: 'Movie request not found' });
      return;
    }
    res.status(200).json(movieRequest);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete a movie request by ID
export const deleteMovieRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMovieRequest = await MovieRequest.findByIdAndDelete(req.params.id);
    if (!deletedMovieRequest) {
      res.status(404).json({ error: 'Movie request not found' });
      return;
    }
    res.status(200).json({ message: 'Movie request deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
