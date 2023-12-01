const express = require('express');
const dashboardRouter = express.Router();
import { Request, Response } from 'express';
import { createReviewRequest, getReviewFromId, updateReviewRequest } from '../controllers/ReviewController';

dashboardRouter.get('/', getReviewFromId);

dashboardRouter.post('/', (req: Request, res: Response) => createReviewRequest(req, res));

dashboardRouter.patch('/', (req: Request, res: Response) => updateReviewRequest(req, res));

module.exports = dashboardRouter;