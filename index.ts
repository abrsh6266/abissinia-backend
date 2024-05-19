import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import User, { IUser } from "./models/User";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 4000;
const SECRET_KEY = "your_secret_key";

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

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

app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
          jwt: token, // Send the token in the response
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      }
      res.status(401).json({
        data: null,
        error: {
          status: 401,
          name: "AuthenticationError",
          message: "Invalid credentials",
          details: {},
        },
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        error: {
          status: 500,
          name: "ServerError",
          message: "Server error",
          details: {},
        },
      });
    }
  });
app.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;
    try {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        const error = new CustomError(
          "Email or Username are already taken",
          400
        );
        throw error;
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = new User({ username, password: hashedPassword, email });
      await user.save();
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
      res.status(201).json({
        jwt: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
