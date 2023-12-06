import { Types } from 'mongoose';
import Landlord from '../model/Landlord';
import Property, { IProperty } from '../model/Property';
import { getCoordinateByPostalCode } from '../apis/geonames';
import dotenv from 'dotenv';

dotenv.config();

export const createProperty = (postalCode: string, streetName: string, streetNumber: number, landlordId: Types.ObjectId): Promise<IProperty> => {
  return getCoordinateByPostalCode(postalCode)
    .then(location => {
      return Property.create({ postalCode, streetName, streetNumber, location, landlordId });
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

export const getAllProperties = () => {
  return Property.find({}).populate('landlordId');
};

export const getProperty = (postalCode: string, streetName: string, streetNum: number): Promise<IProperty | null> => {
  return Property.findOne({ postalCode, streetName, streetNumber: streetNum }).exec();
};

export const getPropertyByLandlordId = (id: string) => {
  return Property.find({ landlordId: id }).exec();
};

export const getLandlordsFromPostalCode = (postalCode: string) => {
  const postalCodeRegex = new RegExp(postalCode, 'i');
  return Property.find({ postalCode: postalCodeRegex }).populate('landlordId').exec();
};

interface FormattedPropertyData {
  postCode: string;
  streetName: string;
  streetNumber: number;
}

export const updatePropertyById = async function(objectId: string, updatedData: FormattedPropertyData) {

  const formattedData = {
    postalCode: updatedData.postCode,
    streetName: updatedData.streetName,
    streetNumber: updatedData.streetNumber,
  };

  try {
    const updatedDocument = await Property.findByIdAndUpdate(objectId, formattedData, { new: true });

    if (!updatedDocument) {
      throw new Error('Document not found.');
    }
    return updatedDocument;
  } catch (error) {
    throw new Error('Error updating document.');
  }
};