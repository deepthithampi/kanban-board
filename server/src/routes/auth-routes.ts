import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
// Extract username and password from request body
const {username , password} = req.body;
// Find the user in the database by username

const user = await User.findOne({
 where: {username},
});
// If user is not found, send an authentication failed response
if(!user){
  return res.status(401).json({message : 'Authentcation Failed'})
}
// Compare the provided password with the stored hashed password
const passwordIsValid = await bcrypt.compare(password,user.password)
if(!passwordIsValid){
  return res.status(401).json({message : 'Authentication Failed'})
}
// Get the secret key from environment variables
const secretKey = process.env.JWT_SECRET_KEY ||'';
 // Generate a JWT token for the authenticated user
const token = jwt.sign({username},secretKey,{expiresIn:'1h'});
 // Send the token as a JSON response
 return res.json({token})
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
