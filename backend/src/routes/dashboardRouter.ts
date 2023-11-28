const express = require('express');
const dashboardRouter = express.Router();
import { Request, Response } from 'express';

// Dashboard Controller (Mongo/Mongoose)
const dbc = require('../controllers/DashboardController');

// Create a new controller here
const dashboardController = new dbc();

// GET /api/dashboard
dashboardRouter.get('/', async (req: Request, res: Response) => {

  // TODO fetch the user object / user id
  const userEmail = "rs@email.com";

  // Call the controller to fetch the reviews given the email
  const results = await dashboardController.getDasboardForUser(userEmail);

  res.send(results);
});

// Other user-related routes (POST, PUT, DELETE, etc.)

module.exports = dashboardRouter;