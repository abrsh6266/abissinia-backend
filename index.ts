import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import authRoutes from "./routes/authRoutes";
import otherRoutes from "./routes/otherRoutes";
import axios from "axios";

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
  body: {
    tx_ref: string;
  };
}

// Payment verification endpoint
app.post(
  "/verify-payment",
  async (req: VerifyPaymentRequest, res: Response) => {
    const { tx_ref } = req.body;
    const { user_id, movieTitle, day, time, seatArea, seats, extras, totalPrice } = req.query;

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
        // You can use user_id, movieTitle, day, time, seatArea, seats, extras, and totalPrice here
        res.status(200).json({
          message: "Payment verified successfully",
          data: response.data,
          user: {
            id: user_id,
            movieTitle,
            day,
            time,
            seatArea,
            seats,
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
