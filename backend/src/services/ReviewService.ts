import { HydratedDocument, Types } from 'mongoose';
import Review, { IReview } from '../model/Review';

// Services
import { getCalculatedReviewScore } from './ServicesHelper';
import { findByUserEmail, } from '../services/UserService';
import { createLandlord, findLandlordByName } from '../services/LandlordService';
import { createProperty, getProperty } from '../services/PropertyService';
import { callGoogleSenti } from '../apis/google-natural-lang-api';

export const createReview = (
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
  // the promise from IReview could be the object or null
  // the | null is for every other API call
): Promise<IReview | null> => {

  let userId: Types.ObjectId;
  let landlordId: Types.ObjectId;
  let propertyId: Types.ObjectId;

  // promise based API call then chain the rest.
  // NOTE: sentiment is the raw value from google api, which ranges from -1 to 1.  This is what gets stored in the DB.
  let sentiment = 0;
  let calculatedScore = 0;

  //Sorry in advanced for future me (or any devs who has to look at this promise chain).  Maybe async await would be easier to read.

  // first lets get the sentiment score
  return callGoogleSenti(desc).then((score) => {
    if (score) {
      sentiment = score;
    }

    //calculate the 'grand score'
    calculatedScore = getCalculatedReviewScore(
      healthSafety,
      respect,
      repair,
      sentiment
    );

    return findByUserEmail(email).then((user) => {

      if (!user) {
        // return error, no user from this email
        console.log("Email for this user does not exist.");
        return null;
      }

      // if valid user, assign the object id
      userId = user._id;

      return findLandlordByName(landlord_first_name, landlord_last_name)
        .catch(error => {
          console.log(error, "error fetching a landord given the name.");
          return null;
        });
    }).then((landlord) => {

      if (!landlord) {

        // Create a new landlord
        return createLandlord(landlord_first_name, landlord_last_name, organization)
          .then((result) => {
            landlordId = result._id;

            // Create property with landlordId just above
            return createProperty(postal_code, street_name, street_num, landlordId)
              .then(newProperty => {
                propertyId = newProperty._id;

                // ...Finally we have all 2 ids, create Review.
                return createReviewWithUpdatedValues(title, desc, sentiment, healthSafety, respect, repair, calculatedScore, userId, landlordId)
                  .catch(error => {
                    console.log(error, "error creating review.");
                    return null;
                  });
              })
              .catch(error => {
                console.log(error, "error creating a new property in ReviewService.");
                return null;
              });
          })
          .catch(error => {
            console.log("Could not create a new landlord in Review Service.", error);
            return null;
          });
      }
      // Landlord exists
      else {
        landlordId = landlord._id;

        return getProperty(postal_code, street_name, street_num)
          .then((foundProperty) => {
            if (foundProperty) {
              return foundProperty;
            } else {
              // Create property with landlordId just above
              return createProperty(postal_code, street_name, street_num, landlordId);
            }
          })
          .then(property => {
            propertyId = property._id;

            // ...Finally we have all 2 ids, create Review.
            return createReviewWithUpdatedValues(title, desc, sentiment, healthSafety, respect, repair, calculatedScore, userId, landlordId);
          })
          .catch(err => {
            console.log(err, 'Error creating review');
            return null;
          });
      }
    })
      .catch(error => {
        // from email
        console.log(error, "error fetching user from email.");
        return null;
      });
  });
};

const createReviewWithUpdatedValues = function (
  title: string,
  desc: string,
  //raw sent. score from Google API.
  sentiment: number,
  healthSafety: number,
  respect: number,
  repair: number,
  calculatedScore: number,
  userId: Types.ObjectId,
  landlordId: Types.ObjectId
): Promise<IReview> {
  // Step 5
  const review: HydratedDocument<IReview> = new Review({
    title: title,
    description: desc,
    sentiment: sentiment,
    healthSafety: healthSafety,
    respect: respect,
    repair: repair,
    overallScore: calculatedScore,
    userId: userId,
    landlordId: landlordId,
  });
  return review.save();
};

export const findReviewsByLandlordId = async(landlordId: string): Promise<IReview[] | null> => {
  return Review.find({ landlordId: landlordId }).exec();
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
