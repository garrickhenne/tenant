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
    const landlords = [];
    const properties = await getLandlordsFromPostalCode(postalCode);
    for (const property of properties) {
      // Check if property landlord id is already contained in landlords array.
      const foundIndex = landlords.findIndex(landlord => property.landlordId._id === landlord.landlord._id);
      const { _id, postalCode, streetName, streetNumber } = property;
      if (foundIndex < 0) {
        const landlord = {
          landlord: property.landlordId,
          properties: [{ _id, postalCode, streetName, streetNumber, landlordId: property.landlordId._id }]
        };
        landlords.push(landlord);
      } else {
        landlords[foundIndex].properties.push({ _id, postalCode, streetName, streetNumber, landlordId: property.landlordId._id });
      }
    }

    return landlords;
  } catch (error) {
    throw Error('Search by postal code database error.');
  }
};