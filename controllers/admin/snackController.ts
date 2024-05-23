import { Request, Response, NextFunction } from 'express';
import Snack, { ISnack } from '../../models/Snack';

// Function to handle creating a new snack
export const createSnack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, name, image, price } = req.body;
    const newSnack = new Snack({
      type,
      name,
      image,
      price,
    });
    const savedSnack = await newSnack.save();
    res.status(201).json(savedSnack);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all snacks
export const getAllSnacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const snacks = await Snack.find();
    res.status(200).json(snacks);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single snack by ID
export const getSnackById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const snack = await Snack.findById(id);
    if (!snack) {
      return res.status(404).json({ message: 'Snack not found' });
    }
    res.status(200).json(snack);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a snack by ID
export const updateSnackById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedSnack = await Snack.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSnack) {
      return res.status(404).json({ message: 'Snack not found' });
    }
    res.status(200).json(updatedSnack);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a snack by ID
export const deleteSnackById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedSnack = await Snack.findByIdAndDelete(id);
    if (!deletedSnack) {
      return res.status(404).json({ message: 'Snack not found' });
    }
    res.status(200).json({ message: 'Snack deleted successfully' });
  } catch (error) {
    next(error);
  }
};
