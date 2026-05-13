import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import path from "path";
import { fileURLToPath } from "url";

import connectDB from './config/database.js';

import authRoutes from './routes/auth.routes.js';
import problemRoutes from './routes/problem.routes.js';
import submissionRoutes from './routes/submission.routes.js';


// Load environment variables
dotenv.config();


// Connect to database
connectDB();

const app = express();


// __dirname setup
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// Middleware
app.use(cors({
  origin:
    process.env.FRONTEND_URL ||
    'http://localhost:5173',

  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());


// API Routes
app.use('/api/auth', authRoutes);

app.use('/api/problems', problemRoutes);

app.use('/api/submissions', submissionRoutes);


// Health route
app.get("/health", (req, res) => {

  res.json({
    status: "OK",
    message: "Server running"
  });

});


// Serve frontend static files
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);


// React Router support
app.get("*", (req, res) => {

  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );

});


// Error handling
app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong!"
  });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});