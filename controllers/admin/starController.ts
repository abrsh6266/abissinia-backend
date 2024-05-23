import { Request, Response, NextFunction } from 'express';
import Star, { IStar } from '../../models/Star';

// Function to handle creating a new star
export const createStar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, address, profilePhoto } = req.body;
    const newStar = new Star({
      name,
      address,
      profilePhoto,
    });
    const savedStar = await newStar.save();
    res.status(201).json(savedStar);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all stars
export const getAllStars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stars = await Star.find();
    res.status(200).json(stars);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single star by ID
export const getStarById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const star = await Star.findById(id);
    if (!star) {
      return res.status(404).json({ message: 'Star not found' });
    }
    res.status(200).json(star);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a star by ID
export const updateStarById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedStar = await Star.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStar) {
      return res.status(404).json({ message: 'Star not found' });
    }
    res.status(200).json(updatedStar);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a star by ID
export const deleteStarById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedStar = await Star.findByIdAndDelete(id);
    if (!deletedStar) {
      return res.status(404).json({ message: 'Star not found' });
    }
    res.status(200).json({ message: 'Star deleted successfully' });
  } catch (error) {
    next(error);
  }
};
