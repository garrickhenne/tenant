import { Types } from 'mongoose';
import Landlord from '../model/Landlord';
import Property, { IProperty } from '../model/Property';

export const createProperty = (postalCode: string, streetName: string, streetNumber: number, landlordId: Types.ObjectId): Promise<IProperty> => {
  return Property.create({ postalCode, streetName, streetNumber, landlordId });
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

export const getProperty = (postalCode: string, streetName: string, streetNum: number): Promise<IProperty | null> => {
  return Property.findOne({ postalCode, streetName, streetNumber: streetNum }).exec();
};

export const getPropertyByLandlordId = (id: string) => {
  return Property.find({ landlordId: id }).exec();
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