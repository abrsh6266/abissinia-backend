import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import authRoutes from "./routes/authRoutes";
import otherRoutes from "./routes/otherRoutes";
import axios from "axios";
import Movie from "./models/Movie";
import User from "./models/User";
import Snack from "./models/Snack";
import Order from "./models/Order";
import Booking from "./models/Booking";
import mongoose from "mongoose";
import MovieShow from "./models/MovieShow";

const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api", otherRoutes);

// Custom error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(err.status || 500).json({
      data: null,
      error: {
        status: err.status || 500,
        name: err.name || "ApplicationError",
        message: err.message || "Internal Server Error",
        details: err.details || {},
      },
    });
  } else {
    next();
  }
});

interface VerifyPaymentRequest extends Request {
  query: {
    user_id: string;
    movieTitle: string;
    day: string;
    time: string;
    seatArea: string;
    seats: string;
    extras?: string;
    totalPrice: string;
    tx_ref: string;
  };
}

// Payment verification endpoint
app.get(
  "/verify-payment",
  async (req: VerifyPaymentRequest, res: Response) => {
    const {
      user_id,
      movieTitle,
      day,
      time,
      seatArea,
      seats,
      totalPrice,
      tx_ref,
    } = req.query;

    try {
      const response = await axios.get(
        `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          },
        }
      );

      if (response.data.status === "success") {
        // Handle successful payment verification

        const movie = await Movie.findOne({ title: movieTitle });
        if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
        }

        const user = await User.findById(user_id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Handle extras
        const extras = req.query.extras
          ? JSON.parse(req.query.extras as string)
          : [];
        const snacks = await Promise.all(
          extras.map(async (extra: { name: string; amount: number }) => {
            const snack = await Snack.findOne({ name: extra.name });
            if (!snack) {
              throw new Error(`Snack '${extra.name}' not found`);
            }
            return { ...snack.toObject(), quantity: extra.amount };
          })
        );

        // Convert seats to an array
        const seatsArray = seats.split(',').map(seat => seat.trim());

        // Find the movie show
        const movieShow = await MovieShow.findOne({
          movieId: movie._id,
          showTime: {
            $elemMatch: {
              day: day,
              time: time,
            },
          },
        });

        if (!movieShow) {
          return res.status(404).json({ message: "Movie show not found" });
        }

        // Initialize selectedSeat if it is null or undefined
        if (!movieShow.selectedSeat) {
          movieShow.selectedSeat = [];
        }

        // Update the selected seats
        const updatedSeats = [...new Set([...movieShow.selectedSeat, ...seatsArray])];

        // Create a new order
        const order = new Order({
          snacks: snacks.map((snack) => ({
            snackId: snack._id,
            quantity: snack.quantity,
          })),
          movieId: movie._id,
          price: totalPrice,
        });
        await order.save();

        // Create a new booking
        const booking = new Booking({
          userId: user._id,
          movieShowId: movieShow._id,
          order: order._id,
          seats: {
            booked: seatsArray.map((seat) => ({ seatNumber: parseInt(seat, 10) })),
          },
          price: totalPrice,
        });
        await booking.save();

        // Update the movie show with the new selected seats
        movieShow.selectedSeat = updatedSeats;
        await movieShow.save();

        res.status(200).json({
          message: "Payment verified successfully",
          data: response.data,
          user: {
            id: user_id,
            movieTitle,
            day,
            time,
            seatArea,
            seats: seatsArray,
            extras,
            totalPrice,
          },
        });
      } else {
        res.status(400).json({
          message: "Payment verification failed",
          data: response.data,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
