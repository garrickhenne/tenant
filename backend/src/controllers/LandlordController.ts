// The place where we would be given a request, we then call services to dispatch database to do something
// and return response.

import { Request, Response } from 'express';
import { findLandlordById, searchLandlordsByFullName } from '../services/LandlordService';
import { findReviewsByLandlordId } from '../services/ReviewService';

export const getReviewsWithLandlordId = async function(request: Request, response: Response) {
  //returns response.json array of reviews associated with landlord.

  const { landlordId } = request.query;

  if (typeof landlordId === 'string') {
    try {
      const landlord = await findLandlordById(landlordId);
    
      const reviews = await findReviewsByLandlordId(landlordId);

      return response.json({ landlord, reviews });
    } catch (error) {
      return response.status(401).json({ message:error });
    }
    
  }
};

export const getLandlordByName = async(request: Request, response: Response) => {
  const { name } = request.query;

  if (typeof name !== 'string') {
    return response.status(400).json({ message: 'Invalid param for search. ' });
  }

  try {
    const landlords = await searchLandlordsByFullName(name);

    return response.json(landlords);
  } catch (error) {
    // We encountered db error, respond with an empty array.
    return response.status(500).json([]);
  }
};