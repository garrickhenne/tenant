import { ILandlord } from '../model/Landlord';
import {
  createLandlord,
  findLandlordByName
}
  from '../services/LandlordService';
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
      console.log(newReview);
      if (newReview) {
        res.status(200).json(newReview);
      }
      else {
        res.status(500).json({ message: 'We had issues creating a review.' });
      }
    });
};

// TODO LOTS OF METHODS DON"T BELONG HERE = WAS TESTING API CALLS
// EVERY METHOD LISTED HERE WORKS (MADE AND VERIFIED API CALLS)

export const createLandlordRequest = (req: Request, res: Response) => {
  const { firstName, lastName, organization }: ILandlord = req.body;

  createLandlord(firstName, lastName, organization)
    .then(newLandlord => {
      if (newLandlord) {
        res.json(newLandlord._id);
      }
      else {
        res.status(401).json({ message: 'Could not create landlord.' });
      }
    });
};

export const findLandlordByNameRequest = (req: Request, res: Response) => {
  const { firstName, lastName, organization }: ILandlord = req.body;
  console.log("hit the get landlord by name");
  findLandlordByName("Bossman", "Bossman LN")
    .then(foundLandlord => {
      if (foundLandlord) {
        res.json(foundLandlord._id);
      }
      else {
        res.status(401).json({ message: 'Could not find landlord.' });
      }
    });
};