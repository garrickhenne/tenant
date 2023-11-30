import { Types } from 'mongoose';
import Landlord from '../model/Landlord';
import Property, { IProperty } from '../model/Property';

export const createProperty = (postalCode: string, streetName: string, streetNumber: number, landlordId: Types.ObjectId): Promise<IProperty> => {
  return new Promise((resolve, reject) => {
    Property.create({ postalCode, streetName, streetNumber, landlordId })
      .then((result) => {
        resolve(result);
      })
      .catch((error: Error) => {
        reject(new Error(`Failed to create property: ${error}`));
      });
  });
};

export const getProperties = (landLordFirstName: string, landLordLastName: string): Promise<IProperty[]> => {

  // Find the Landlords matching the provided name
  return Landlord.find({ firstName: landLordFirstName, lastName: landLordLastName })
    .then(async result => {

      // Extract the ObjectIds of these landlords
      const landlordIds = result.map(landlord => landlord._id);

      return Property.find({ landlordId: { $in: landlordIds } });
    });
};