import { Types } from 'mongoose';
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