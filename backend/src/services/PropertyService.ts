import { Types } from 'mongoose';
import Property, { IProperty } from '../model/Property';

export const createProperty = (postalCode: string, streetName: string, streetNum: number, landlordId: Types.ObjectId): Promise<IProperty> => {
  return new Promise((resolve, reject) => {
    Property.create({ postalCode, streetName, streetNum, landlordId })
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error: Error) => {
        reject(new Error(`Failed to create property: ${error}`));
      });
  });
};