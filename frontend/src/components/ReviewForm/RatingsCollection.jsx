import RatingField from "./RatingField";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";

const RatingsCollection = () => {
  const { reviewRating } = useContext(newReviewContext);
  const { healthSafetyRating, setHealthSafetyRating, repairRating, setRepairRating, respectRating, setRespectRating } = reviewRating;

  return (
    <div className="flex flex-row gap-x-16">
      <RatingField label='Health & Safety' val={healthSafetyRating} setVal={setHealthSafetyRating} />
      <RatingField label='Respect' val={respectRating} setVal={setRespectRating} />
      <RatingField label='Repair' val={repairRating} setVal={setRepairRating} />
    </div>
  );
};

export default RatingsCollection;