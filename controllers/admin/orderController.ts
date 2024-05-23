import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../../models/Order';

// Function to handle creating a new order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { snacks, movieId, date, price } = req.body;
    const newOrder = new Order({
      snacks,
      movieId,
      date,
      price,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching all orders
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching a single order by ID
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// Function to handle updating an order by ID
export const updateOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Function to handle deleting an order by ID
export const deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};
