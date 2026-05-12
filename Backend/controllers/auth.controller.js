// Auth controller
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        solvedProblems: user.solvedProblems,
        totalSubmissions: user.totalSubmissions,
        acceptedSubmissions: user.acceptedSubmissions,
        streak: user.streak,
        maxStreak: user.maxStreak,
        totalSolved: user.totalSolved,
        easySolved: user.easySolved,
        mediumSolved: user.mediumSolved,
        hardSolved: user.hardSolved,
        ranking: user.ranking,
        preferredLanguage: user.preferredLanguage,
        lastSubmissionDate: user.lastSubmissionDate,
        accountStatus: user.accountStatus,
        profileVisibility: user.profileVisibility
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        solvedProblems: user.solvedProblems,
        totalSubmissions: user.totalSubmissions,
        acceptedSubmissions: user.acceptedSubmissions,
        streak: user.streak,
        maxStreak: user.maxStreak,
        totalSolved: user.totalSolved,
        easySolved: user.easySolved,
        mediumSolved: user.mediumSolved,
        hardSolved: user.hardSolved,
        ranking: user.ranking,
        preferredLanguage: user.preferredLanguage,
        lastSubmissionDate: user.lastSubmissionDate,
        accountStatus: user.accountStatus,
        profileVisibility: user.profileVisibility
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('solvedProblems', 'title slug difficulty')
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        solvedProblems: user.solvedProblems,
        totalSubmissions: user.totalSubmissions,
        acceptedSubmissions: user.acceptedSubmissions,
        streak: user.streak,
        maxStreak: user.maxStreak,
        totalSolved: user.totalSolved,
        easySolved: user.easySolved,
        mediumSolved: user.mediumSolved,
        hardSolved: user.hardSolved,
        ranking: user.ranking,
        preferredLanguage: user.preferredLanguage,
        lastSubmissionDate: user.lastSubmissionDate,
        accountStatus: user.accountStatus,
        profileVisibility: user.profileVisibility,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};