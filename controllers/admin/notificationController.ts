import { Request, Response, NextFunction } from 'express';
import Notification, { INotification } from '../../models/Notification';

// Function to handle creating a new notification
export const createNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, date, userId } = req.body;
    const newNotification = new Notification({
      content,
      date,
      userId,
    });
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all notifications
export const getAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single notification by ID
export const getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating a notification by ID
export const updateNotificationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting a notification by ID
export const deleteNotificationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    next(error);
  }
};
