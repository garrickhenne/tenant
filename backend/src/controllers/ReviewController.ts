import { ILandlord } from '../model/Landlord';
import {
  createLandlord,
  findLandlordByName
}
  from '../services/LandlordService';
import { Request, Response } from "express";

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