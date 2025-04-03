import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;  // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({
    where: { username },
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};

export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;

  try {
  const existingUsername = await User.findOne({
    where: { username },
  });
  if (existingUsername) {
    return res.status(400).json({ message: 'Username unavailable'});
  }

  const existingEmail = await User.findOne({
      where: { email },
    });
  if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use'});
  }
        const hashedPassword = await bcrypt.hash(password, 10);

        const NewUser = await User.create({
          username, 
          email,
          password: hashedPassword,
        });
        // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username: NewUser.username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
      } catch (error) { 
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
    };


// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route
router.post('/signup', signup);

export default router;  // Export the router instance



