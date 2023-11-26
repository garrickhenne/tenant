import mongoose, { Schema, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IIncident {
  user: Types.ObjectId,
  landlord: Types.ObjectId,
  property: Types.ObjectId,
  status: string,
  description: string,
  type: string,
  startDate: Date,
  endDate: Date,
  createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const incidentSchema = new Schema<IIncident>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  landlord: { type: Schema.Types.ObjectId, ref: 'Landlord', required: true },
  property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now, immutable: true }
});

// 3. Create a Model.
const Incident = mongoose.model<IIncident>('Incident', incidentSchema);

export default Incident;