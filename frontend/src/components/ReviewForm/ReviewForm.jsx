import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import LandlordSection from "./LandlordSection";
import PropertySection from "./PropertySection";
import RatingsReviewSection from "./RatingsReviewSection";
import axios from 'axios';
import { Navigate } from "react-router-dom";

const ReviewForm = () => {
  const { landlord, property, reviewRating } = useContext(newReviewContext);

  const handleSubmit = (e) => {
    const newUser = {
      title: reviewRating.title,
      firstName: landlord.firstName,
      lastName: landlord.lastName,
      organization: landlord.organization,
      postCode: property.postCode,
      streetNumber: property.streetNumber,
      streetName: property.streetName,
      healthSafetyRating: reviewRating.healthSafetyRating,
      respectRating: reviewRating.respectRating,
      repairRating: reviewRating.repairRating,
      review: reviewRating.review
    };

    e.preventDefault();
    console.log('Landlord', landlord);
    console.log('Property', property);
    console.log('Review', reviewRating);
    
    axios.post('/api/createReview', newUser)
      .then(response => {
        console.log('Created a review!');
        console.log(response.data);
        <Navigate to='/dashboard' />;
      })
      .catch(err => console.log(err));
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