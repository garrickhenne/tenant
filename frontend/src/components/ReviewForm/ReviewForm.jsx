import { useContext, useEffect } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import LandlordSection from "./LandlordSection";
import PropertySection from "./PropertySection";
import RatingsReviewSection from "./RatingsReviewSection";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ReviewForm = () => {
  const navigate = useNavigate();
  const { landlord, property, reviewRating } = useContext(newReviewContext);

  // Gets the reviewId params, if applicable.
  const params = useParams();
  const isEdit = params.reviewId !== undefined;

  // Get the review details
  useEffect(() => {

    // useEffect does nothing if not editing
    if (isEdit) {
      axios.get(`/api/review?reviewId=${params.reviewId}`)
        .then(response => {

          //review and property object {review: {...}, property: {...}}
          const reviewAndProperty = response.data;
          const reviewDetails = response.data.review;

          //landlord object {review: {...landlordId:{...}}}
          const landLordDetails = reviewAndProperty.review.landlordId;

          //property object
          const propertyDetails = response.data.property;

          // Update the form with what we have.
          landlord.setFirstName(landLordDetails.firstName);
          landlord.setLastName(landLordDetails.lastName);
          landlord.setOrganization(landLordDetails.organization !== undefined ? landLordDetails.organization : '');

          property.setPostCode(propertyDetails.postalCode);
          property.setStreetNumber(propertyDetails.streetNumber);
          property.setStreetName(propertyDetails.streetName);

          reviewRating.setHealthSafetyRating(reviewDetails.healthSafety);
          reviewRating.setRepairRating(reviewDetails.repair);
          reviewRating.setRespectRating(reviewDetails.respect);

          reviewRating.setTitle(reviewDetails.title);
          reviewRating.setReview(reviewDetails.description);

          // Update IDs
          landlord.setLandlordId(propertyDetails.landlordId);
          property.setPropertyId(propertyDetails._id);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      editUser();
      return;
    }
    createNewUser();
  };

  const editUser = function() {


    const existingUser = {
      review: {
        id: params.reviewId,
        details: {
          title: reviewRating.title,
          healthSafetyRating: reviewRating.healthSafetyRating,
          respectRating: reviewRating.respectRating,
          repairRating: reviewRating.repairRating,
          review: reviewRating.review,
          // calculated sentiment
          // calculated overall score
        }
      },
      property: {
        id: property.propertyId,
        details: {
          postCode: property.postCode,
          streetNumber: property.streetNumber,
          streetName: property.streetName,
        }
      },
      landlord: {
        id: landlord.landlordId,
        details: {
          firstName: landlord.firstName,
          lastName: landlord.lastName,
          organization: landlord.organization,
        }
      }
    };
    console.log("editing user!, ", existingUser);
    axios.patch('/api/review', existingUser)
      .then(response => {
        navigate('/dashboard');
      })
      .catch(err => console.log(err));
  };

  const createNewUser = function() {
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

    axios.post('/api/review', newUser)
      .then(response => {
        navigate('/dashboard');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <main className="flex justify-center gap-y-7 flex-col items-center">
        <h1 className="text-left font-bold text-4xl min-w-[75%]">
          {isEdit ? 'Edit' : 'Submit'} a Landlord Review</h1>
        <LandlordSection />
        <PropertySection />
        <RatingsReviewSection />
        <button className="rounded-full bg-transparent border-2 border-white" onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Submit'}</button>
      </main>
    </>
  );
};

export default ReviewForm;