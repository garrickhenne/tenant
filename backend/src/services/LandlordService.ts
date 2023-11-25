// Here we would have a function like createUser that would create a new user with data taken from the controller,
// then create a new model (taken from model folder), save the user and return it.
import { HydratedDocument } from 'mongoose';
import LandlordModel, { ILandlord } from '../model/Landlord';

const createLandlord = (firstName: string, lastName: string, organization?: string) => {
  const landlord: HydratedDocument<ILandlord> = new LandlordModel({ firstName, lastName, organization });
  return landlord.save();
};

const findLandlordById = (landlordId: string): Promise<ILandlord | null> => {
  return LandlordModel.findById(landlordId).exec();
};

const deleteLandlord = (landlordId: string): Promise<ILandlord | null> => {
  return LandlordModel.findByIdAndDelete(landlordId).exec();
};

module.exports = {
  createLandlord,
  findLandlordById,
  deleteLandlord
};