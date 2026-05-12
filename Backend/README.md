# Code Editor Backend

Backend API for the coding platform built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Problem management
- Code submission and execution tracking
- MongoDB database with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── auth.controller.js
│   ├── problem.controller.js
│   └── submission.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── user.model.js
│   ├── problem.model.js
│   └── submission.model.js
├── routes/
│   ├── auth.routes.js
│   ├── problem.routes.js
│   └── submission.routes.js
├── utils/
├── services/
├── server.js
├── .env
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:slug` - Get problem by slug
- `POST /api/problems` - Create new problem

### Submissions
- `POST /api/submissions/run` - Run code
- `POST /api/submissions/submit` - Submit code
- `GET /api/submissions/history` - Get submission history

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb+srv://level2:Anurag752880@cluster0.kb3wxg8.mongodb.net/leetcode
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
```

3. Start development server:
```bash
npm run dev
```

4. Or start production server:
```bash
npm start
```

## Database Models

### User
- name, email, password, avatar, role
- solvedProblems, streak, totalSolved, ranking

### Problem
- title, slug, description, difficulty, tags
- examples, constraints, starterCode, referenceSolution
- visibleTestCases, hiddenTestCases, hints
- acceptanceRate, submissionsCount, acceptedCount, companies

### Submission
- user, problem, language, code, status
- runtime, memory, testCasesPassed, totalTestCases

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `FRONTEND_URL`: Frontend URL for CORS

## Development

The server uses ES modules (`"type": "module"` in package.json).

Database indexes are set up for optimal performance:
- Problems: indexed by slug
- Submissions: compound index on user and problem