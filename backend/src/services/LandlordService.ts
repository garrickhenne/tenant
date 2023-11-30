// Here we would have a function like createUser that would create a new user with data taken from the controller,
// then create a new model (taken from model folder), save the user and return it.
import { HydratedDocument, Types } from 'mongoose';
import LandlordModel, { ILandlord } from '../model/Landlord';

export const createLandlord = (firstName: string, lastName: string, organization?: string): Promise<ILandlord> => {
  const landlord: HydratedDocument<ILandlord> = new LandlordModel({ firstName, lastName, organization });
  return landlord.save();
};

export const createNewLandlord = (
  firstName: string,
  lastName: string,
  organization?: string
): Promise<ILandlord> => {
  return new Promise((resolve, reject) => {
    LandlordModel.create({ firstName, lastName, organization })
      .then((result) => {
        resolve(result);
      })
      .catch((error: Error) => {
        console.log(error);
        reject(new Error(`Failed to create landlord: ${error}`));
      });
  });
};

export const findLandlordById = (landlordId: string): Promise<ILandlord | null> => {
  return LandlordModel.findById(landlordId).exec();
};

export const deleteLandlord = (landlordId: string): Promise<ILandlord | null> => {
  return LandlordModel.findByIdAndDelete(landlordId).exec();
};

export const findLandlordByName = (firstName: string, lastName: string): Promise<ILandlord | null> => {
  return LandlordModel.findOne({ firstName: firstName, lastName: lastName });
};