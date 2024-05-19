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
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
          jwt: token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      }
      return res.status(400).json({
        data: null,
        error: {
          status: 400,
          name: "ValidationError",
          message: "Invalid email or password",
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
        return res.status(400).json({
          data: null,
          error: {
            status: 400,
            name: "ApplicationError",
            message: "Email or Username are already taken",
            details: {},
          },
        });
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
