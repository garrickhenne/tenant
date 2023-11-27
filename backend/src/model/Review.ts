import mongoose, { Schema, Types } from "mongoose";

export interface IReview {
  title: string;
  description: string;
  sentiment?: number;
  healthSafety: number;
  respect: number;
  repair: number;
  overallScore: number;
  userId: Types.ObjectId;
  landlordId: Types.ObjectId;
}

const reviewSchema = new Schema<IReview>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sentiment: { type: Number },
  healthSafety: { type: Number, required: true },
  respect: { type: Number, required: true },
  repair: { type: Number, required: true },
  overallScore: { type: Number },
  userId: { type: Schema.ObjectId, required: true, ref: "User" },
  landlordId: { type: Schema.ObjectId, required: true, ref: "Landlord" }
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;