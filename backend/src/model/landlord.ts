import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 1. Create an interface representing a document in MongoDB.
interface ILandlord {
  firstName: string;
  lastName: string;
}

// 2. Create a Schema corresponding to the document interface.
const landlordSchema = new Schema<ILandlord>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

// 3. Create a Model.
const Landlord = model<ILandlord>('Landlord', landlordSchema);

export default new Landlord({
  firstName: 'Garrick',
  lastName: 'Henne'
});


