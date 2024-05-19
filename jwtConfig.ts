import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a new interface that extends Express's Request interface
interface RequestWithUser extends ExpressRequest {
  user?: any; // Define the user property
}

const SECRET_KEY = "your_secret_key";

export const verifyToken = (
  req: RequestWithUser, 
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      data: null,
      error: {
        status: 401,
        name: "AuthenticationError",
        message: "Token is missing",
        details: {},
      },
    });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        data: null,
        error: {
          status: 401,
          name: "AuthenticationError",
          message: "Invalid token",
          details: {},
        },
      });
    }
    // Cast req to RequestWithUser to access the user property
    (req as RequestWithUser).user = decoded;
    next();
  });
};

export const generateToken = (user: any): string => {
  return jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
};
