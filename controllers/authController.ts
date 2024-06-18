import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const SECRET_KEY = "your_secret_key";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" });
      return res.status(200).json({
        jwt: token,
        user: {
          role: user.role,
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
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
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  const avatar =
    "https://firebasestorage.googleapis.com/v0/b/abissinia-tickets.appspot.com/o/images%2Favatar2.png?alt=media&token=e591a9bd-aeb6-4cbc-ba31-2c286f6f6f1c";
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
    const user = new User({
      username,
      password: hashedPassword,
      email,
      avatar,
    });
    await user.save();
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
    res.status(201).json({
      jwt: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      data: null,
      error: {
        status: 400,
        name: "ValidationError",
        message: "Token is required",
        details: {},
      },
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({
      data: {
        message: "Token is valid",
        user: decoded,
      },
      error: null,
    });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        data: null,
        error: {
          status: 401,
          name: "AuthorizationError",
          message: "Token has expired",
          details: {},
        },
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        data: null,
        error: {
          status: 401,
          name: "AuthorizationError",
          message: "Invalid Token",
          details: {},
        },
      });
    }

    // Handle other possible errors
    return res.status(500).json({
      data: null,
      error: {
        status: 500,
        name: "InternalServerError",
        message: "An error occurred while verifying the token",
        details: {},
      },
    });
  }
};
export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { username, email, avatar, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        data: null,
        error: {
          status: 404,
          name: "NotFoundError",
          message: "User not found",
          details: {},
        },
      });
    }

    if (oldPassword && newPassword) {
      const isMatch = bcrypt.compareSync(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          data: null,
          error: {
            status: 400,
            name: "ValidationError",
            message: "Old password is incorrect",
            details: {},
          },
        });
      }
      user.password = bcrypt.hashSync(newPassword, 10);
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    await user.save();

    res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// New method to delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        data: null,
        error: {
          status: 404,
          name: "NotFoundError",
          message: "User not found",
          details: {},
        },
      });
    }

    res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
