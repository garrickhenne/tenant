import Review, { IReview } from "../model/Review";

export const findReviewsByLandlordId = async(landlordId: string): Promise<IReview[] | null> => {
  return Review.find({ landlordId: landlordId }).exec();
};