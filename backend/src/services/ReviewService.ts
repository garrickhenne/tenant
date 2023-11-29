import { HydratedDocument } from 'mongoose';
import Review, { IReview } from '../model/Review';

import { getCalculatedReviewScore } from './ServicesHelper';
import mongoose, { Types } from "mongoose";

// Other Services
import { findByUserEmail, } from '../services/UserService';
import { createNewLandlord, findLandlordByName } from '../services/LandlordService';
import { createProperty } from '../services/PropertyService';

export const createReview = (
  // Step 1
  email: string,
  landlord_first_name: string,
  landlord_last_name: string,
  organization: string,
  postal_code: string,
  street_num: number,
  street_name: string,
  healthSafety: number,
  respect: number,
  repair: number,
  title: string,
  desc: string
): Promise<IReview> => {

  let userId: Types.ObjectId;
  let landlordId: Types.ObjectId;
  let propertyId: Types.ObjectId;

  // Step 2
  findByUserEmail(email).then((user) => {

    if (!user) {
      // return error, no user from this email
      throw Error("Email for this user does not exist.");
    }

    // if valid user, assign the object id
    userId = user._id;

    return findLandlordByName(landlord_first_name, landlord_last_name);
  }).then((landlord) => {

    if (!landlord) {

      // Create a new landlord
      return createNewLandlord(landlord_first_name, landlord_last_name, organization)
        .then((result) => {
          landlordId = result._id;

          // Create property with landlordId just above
          createProperty(postal_code, street_name, street_num, landlordId)
            .then(newProperty => {
              propertyId = newProperty._id;

              // ...Finally we have all 3 ids, create Review.
            })
            .catch(error => {
              console.log(error, "error creating a new property in ReviewService.");
            });
        })
        .catch(error => {
          console.log("Could not create a new landlord in Review Service.");
        });
    }
    // Landlord exists
    else {
      landlordId = landlord._id;

      // Create property with landlordId just above
      createProperty(postal_code, street_name, street_num, landlordId)
        .then(newProperty => {
          propertyId = newProperty._id;

          // ...Finally we have all 3 ids, create Review.
        })
        .catch(error => {
          console.log(error, "error creating a new property in ReviewService.");
        });
    };
  });
  // TODO Step 3
  const sentiment = 0;

  // Step 4
  const calculatedScore = getCalculatedReviewScore(
    healthSafety,
    respect,
    repair,
    sentiment
  );

  // Step 5
  const review: HydratedDocument<IReview> = new Review({
    title: title,
    description: desc,
    sentiment: sentiment,
    healthSafety: healthSafety,
    respect: respect,
    repair: repair,
    overallScore: calculatedScore,
    userId: 'TODO',
    landlordId: 'TODO'
  });
  return review.save();
};

// LOGIC
// --STEP 1--
// Going to be given:
//  user email, STRING
//  landlord first and last name, STRING
//  organization (optional), STRING
//  postal code, STRING, need to format as 'XXX-XXX' format
//  street num, NUMBER
//  street name, STRING
//  healthSafety, NUMBER, out of 5
//  respect, NUMBER, out of 5,
//  repair, NUMBER out of 5
//  title, STRING
//  desc, STRING
// All strings need to be trimmed of spaces on 'both sides'

// --STEP 2--
// if the passed in landlord first and last name doesn't return an exact match (Ignore Organization):
//   we have to create a landlord, return object id of the new landlord
// else
//   we fetch the object id of the landlord

// if the passed in postal code / street # / street name doesn't return an exact match:
//   we have to create a new property, using the landlord id from above
// else
//   we have an existing property, but that means we have an existing landlord...
//  Check if the existing property landlord id matches the id from above.
//      if it matches
//         proceed with creating the submission with the property id and landlord id from the property.
//      if it doesn't match
//         we have to create a new property, using the landlord id from above. Proceed to create the review with the new propertyid and landlord id.

// --STEP 3--
// Make API call to GNL to fetch the sentiment of the description.

// --STEP 4--
// calculate overall score, using helper method (based off of %?  A rating out of 10? 100? TBD).

// --STEP 5--
// Create + Return back the new review created / or boolean