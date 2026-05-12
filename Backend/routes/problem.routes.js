import express from 'express';
import { getAllProblems, getProblemBySlug, createProblem } from '../controllers/problem.controller.js';

const router = express.Router();

router.get('/', getAllProblems);
router.get('/:slug', getProblemBySlug);
router.post('/', createProblem);

export default router;