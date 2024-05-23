import { Request, Response, NextFunction } from 'express';
import Hall, { IHall } from '../../models/Hall';

// Function to handle creating a new hall
export const createHall = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, address, seats } = req.body;
    const newHall = new Hall({
      name,
      address,
      seats,
    });
    const savedHall = await newHall.save();
    res.status(201).json(savedHall);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all halls
export const getAllHalls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const halls = await Hall.find();
    res.status(200).json(halls);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single hall by ID
export const getHallById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const hall = await Hall.findById(id);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.status(200).json(hall);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a hall by ID
export const updateHallById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedHall = await Hall.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.status(200).json(updatedHall);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a hall by ID
export const deleteHallById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedHall = await Hall.findByIdAndDelete(id);
    if (!deletedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.status(200).json({ message: 'Hall deleted successfully' });
  } catch (error) {
    next(error);
  }
};
