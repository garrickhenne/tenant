import mongoose, { Document, Schema, Types } from "mongoose";

export interface ILocation {
  type: string;
  coordinates: number[];
}

// longitude comes first in a GeoJSON coordinate array, not latitude
// [LAT, LONG]
export interface IProperty extends Document {
  postalCode: string;
  streetName: string;
  streetNumber: number;
  location: ILocation;
  landlordId: Types.ObjectId;
}

const propertySchema = new Schema<IProperty>({
  postalCode: { type: String, required: true },
  streetName: { type: String, required: true },
  streetNumber: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      // [0] - Lat
      // [1] - Long
      type: [Number],
    }
  },
  landlordId: { type: Schema.ObjectId, required: true, ref: "Landlord" }
});

export default mongoose.model<IProperty>('Property', propertySchema);