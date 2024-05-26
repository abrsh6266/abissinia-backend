import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import authRoutes from "./routes/authRoutes";
import otherRoutes from "./routes/otherRoutes";

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
//payment
app.get("/api/verifyPayment", async (req, res) => {
  const { tx_ref, id } = req.query;
  const myHeaders = {
    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
  };

  try {
    const response = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const result = await response.json();
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
