// Here we would have a function like createUser that would create a new user with data taken from the controller,
// then create a new model (taken from model folder), save the user and return it.
import { HydratedDocument } from 'mongoose';
import LandlordModel, { ILandlord } from '../model/Landlord';
import { getPropertyByLandlordId } from './PropertyService';

export const createLandlord = (firstName: string, lastName: string, organization?: string): Promise<ILandlord> => {
  const landlord: HydratedDocument<ILandlord> = new LandlordModel({ firstName, lastName, organization });
  return landlord.save();
};

export const findLandlordById = async(landlordId: string): Promise<ILandlord | null> => {
  return LandlordModel.findById(landlordId).exec();
};

export const deleteLandlord = (landlordId: string): Promise<ILandlord | null> => {
  return LandlordModel.findByIdAndDelete(landlordId).exec();
};

export const findLandlordByName = (firstName: string, lastName: string): Promise<ILandlord | null> => {
  return LandlordModel.findOne({ firstName: firstName, lastName: lastName });
};

export const searchLandlordsByFullName = async(name: string) => {
  const nameRegex = new RegExp(name, 'i');
  const landlords = await LandlordModel.find({
    $or: [{ firstName: nameRegex }, { lastName: nameRegex }]
  }).exec();
  
  const promises = landlords.map((landlord) => {
    return getPropertyByLandlordId(landlord._id)
      .then(properties => {
        return { landlord, properties };
      });
  });

  return Promise.all(promises);
};

export const updateLandlordById = async function(objectId: string, updatedData: any) {

  try {
    const updatedDocument = await LandlordModel.findByIdAndUpdate(objectId, updatedData, { new: true });

    if (!updatedDocument) {
      throw new Error('Document not found.');
    }
    return updatedDocument;
  } catch (error) {
    throw new Error('Error updating document.');
  }
};