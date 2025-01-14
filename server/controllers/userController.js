import User from '../models/User.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Determine the role based on email. If email starts with 'admin@', set role as 'Admin'
    const role = email.startsWith('admin@') ? 'Admin' : 'Regular';

    // Create the new user with role
    const user = await User.create({
      email,
      password: hashedPassword,
      role,  // Assign the role to the user
    });

    // Respond with user info excluding the password
    res.status(201).json({
      _id: user.id,
      email: user.email,
      role: user.role, // Include the role in the response
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Include the role in the token payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Retrieve users with email and role
    const users = await User.find({}, 'email role'); // Retrieve only email and role
    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users); // Return the list of users with roles
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};