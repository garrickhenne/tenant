import { Request, Response } from "express";
import { createReview, findReviewDetailsById, updateReviewById } from '../services/ReviewService';
import { updatePropertyById } from '../services/PropertyService';
import { updateLandlordById } from '../services/LandlordService';

export const getReviewFromId = (req: Request, res: Response) => {
  const { reviewId } = req.query;
  if (typeof reviewId === 'string') {

    // fetch the current review data
    findReviewDetailsById(reviewId)
      .then(reviewDetails => {
        if (reviewDetails) {
          return res.json(reviewDetails);
        }
        return res.status(500).json({ message: 'Could not find review.' });
      });
  }
};

export const updateReviewRequest = (req: Request, res: Response) => {
  const { review, property, landlord } = req.body;

  Promise.all([
    updateReviewById(review.id, review.details),
    updatePropertyById(property.id, property.details),
    updateLandlordById(landlord.id, landlord.details)
  ])
    .then((updatedDocuments) => {
      return res.json(updatedDocuments);
    }).catch(() => {
      return res.status(500).json({ message: 'Errors updating review.' });
    });

};

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