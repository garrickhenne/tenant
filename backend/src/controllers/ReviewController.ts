import { Request, Response } from "express";
import { createReview } from '../services/ReviewService';

export const createReviewRequest = (req: Request, res: Response) => {
  const {
    title,
    landlord_first_name,
    landlord_last_name,
    organization,
    postal_code,
    street_num,
    street_name,
    healthSafety,
    respect,
    repair,
    desc,
  } = req.body;

  // get the user
  const user = req.session!.user;
  if (!user) {
    res.status(500).json({ message: 'We had issues finding the user from session.' });
  }

  createReview(
    user.email,
    landlord_first_name,
    landlord_last_name,
    organization,
    postal_code,
    street_num,
    street_name,
    healthSafety,
    respect,
    repair,
    title,
    desc
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