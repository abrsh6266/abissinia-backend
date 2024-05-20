import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

interface JwtPayload {
    email: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            data: null,
            error: {
                status: 401,
                name: 'AuthorizationError',
                message: 'Access token is missing',
                details: {},
            },
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            data: null,
            error: {
                status: 401,
                name: 'AuthorizationError',
                message: 'Invalid token',
                details: {},
            },
        });
    }
};
