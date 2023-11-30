import { Request, Response } from "express";
import { createReview } from '../services/ReviewService';

export const createReviewRequest = (req: Request, res: Response) => {
  const {
    title,
    firstName, //landlord
    lastName, //landlord
    organization,
    postCode,
    streetNumber,
    streetName,
    healthSafetyRating,
    respectRating,
    repairRating,
    review,
  } = req.body;

  // get the user
  const user = req.session!.user;
  if (!user) {
    res.status(500).json({ message: 'We had issues finding the user from session.' });
  }

  createReview(
    user.email,
    firstName, //landlord
    lastName, //landlord
    organization,
    postCode,
    streetNumber,
    streetName,
    healthSafetyRating,
    respectRating,
    repairRating,
    title,
    review
  )
    .then(newReview => {
      if (newReview) {
        res.status(200).json(newReview);
      }
      else {
        res.status(500).json({ message: 'We had issues creating a review.' });
      }
    });
};