import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import LandlordSection from "./LandlordSection";
import PropertySection from "./PropertySection";
import RatingsReviewSection from "./RatingsReviewSection";

const ReviewForm = () => {
  const { landlord, property, reviewRating } = useContext(newReviewContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Landlord', landlord);
    console.log('Property', property);
    console.log('Review', reviewRating);
  };

  return(
    <>
      <main className="flex justify-center gap-y-7 flex-col items-center">
        <h1 className="text-left font-bold text-4xl min-w-[75%]">Submit a Landlord Review</h1>
        <LandlordSection />
        <PropertySection />
        <RatingsReviewSection />
        <button className="rounded-full bg-transparent border-2 border-white" onClick={handleSubmit}>Submit</button>
      </main>
    </>
  );
};

export default ReviewForm;