import { Request, Response, NextFunction } from "express";
import Notification from "../../models/Notification";

// Function to create a notification for a user when an admin approves their ticket payment
export const createNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, userId, link } = req.body;

    if (!content || !userId) {
      return res.status(400).json({ message: "Content and userId are required" });
    }

    const newNotification = new Notification({
      content,
      userId,
      link: link || "#",
    });

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    next(error);
  }
};

// Function to remove a specific notification by ID
export const removeNotificationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Function to get notifications by user ID
export const getNotificationsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({ date: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// Function to update the seen status of a specific notification by ID
export const updateNotificationSeenStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { seen } = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { seen },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    next(error);
  }
};
