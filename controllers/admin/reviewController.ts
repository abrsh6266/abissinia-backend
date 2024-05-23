import { Request, Response, NextFunction } from 'express';
import Review, { IReview } from '../../models/Review';

// Function to handle creating a new review
export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, rating, comment, date } = req.body;
    const newReview = new Review({
      userId,
      rating,
      comment,
      date,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all reviews
export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single review by ID
export const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a review by ID
export const updateReviewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a review by ID
export const deleteReviewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
