import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './db';
import User, { IUser } from './models/User';
import bcrypt from 'bcryptjs'; 

const app = express();
const PORT = 4000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token });
        }
        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/register', async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        // Hash the password before saving
        const hashedPassword = bcrypt.hashSync(password, 10); // Generate a salted hash with 10 rounds
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
