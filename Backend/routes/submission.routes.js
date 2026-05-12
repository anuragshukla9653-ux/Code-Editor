import express from 'express';
import { runCode, submitCode, getSubmissionHistory, getSubmissionsByProblem } from '../controllers/submission.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/run', authenticate, runCode);
router.post('/submit', authenticate, submitCode);
router.get('/history', authenticate, getSubmissionHistory);
router.get('/problem/:problemId', authenticate, getSubmissionsByProblem);

export default router;