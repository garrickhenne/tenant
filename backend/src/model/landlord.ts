import mongoose, { Schema } from "mongoose";

// Helpful doc for use in typescript: https://mongoosejs.com/docs/typescript.html

// 1. Create an interface representing a document in MongoDB.
interface ILandlord {
  firstName: string;
  lastName: string;
  organization?: string;
  createdAt: Date
}

// 2. Create a Schema corresponding to the document interface.
const landlordSchema = new Schema<ILandlord>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  organization: { type: String },
  createdAt: { type: Date, default: new Date(), immutable: true }
});

// 3. Create a Model.
export default mongoose.model<ILandlord>('Landlord', landlordSchema);


