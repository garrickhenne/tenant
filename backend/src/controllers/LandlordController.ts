// The place where we would be given a request, we then call services to dispatch database to do something
// and return response.

import { Request, Response } from 'express';
import { findLandlordById, queryLandlordsByFullName } from '../services/LandlordService';
import { findReviewsByLandlordId } from '../services/ReviewService';
import { getLandlordsFromPostalCode } from '../services/PropertyService';

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

export const searchLandlord = async(request: Request, response: Response) => {
  const { name, postalCode } = request.query;

  try {
    if (name && typeof name === 'string') {
      const landlords = await searchLandlordWithName(name);
      return response.json(landlords);
    } else if (postalCode && typeof postalCode === 'string') {
      const landlords = await searchLandlordWithPostalCode(postalCode);
      return response.json(landlords);
    } else {
      throw Error('Invalid query params given');
    }
  } catch (error) {
    return response.status(500).json([]);
  }
};

const searchLandlordWithName = async(name: string) => {
  try {
    return queryLandlordsByFullName(name);
  } catch (error) {
    throw Error('Search landlord name database error.');
  }
};

const searchLandlordWithPostalCode = async(postalCode: string) => {
  try {
    return getLandlordsFromPostalCode(postalCode);
  } catch (error) {
    throw Error('Search by postal code database error.');
  }
};