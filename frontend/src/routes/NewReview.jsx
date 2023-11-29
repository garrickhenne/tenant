import { useContext } from "react";
import FormSection from "../components/ReviewForm/FormSection";
import InputTextBox from "../components/ReviewForm/InputTextBox";
import RatingsCollection from "../components/ReviewForm/RatingsCollection";
import { authContext } from "../providers/AuthProvider";
import { Navigate } from 'react-router-dom';
import ReviewTextInput from "../components/ReviewForm/ReviewTextInput";

const NewReview = () => {
  const { user } = useContext(authContext);
  // need to use useContext with some review context that will contain
  /*
    - Landlord first name
    - Landlord last name
    - Landlord organization(?)

    - Property Postal Code
    - Property Street Number (?)
    - Property Street Name (?)

    - Health and Safety Rating
    - Respect Rating
    - Repair Rating
    - Review Title
    - Review itself
  */

  const handleSubmit = () => {
    
  };

  if (!user) {
    <Navigate to='/' />;
  }

  return(
    <>
      <main className="flex justify-center gap-y-7 flex-col items-center">
        <h1 className="text-left font-bold text-4xl min-w-[75%]">Submit a Landlord Review</h1>
        <FormSection  titleLabel='Landlord Details'>
          <InputTextBox labelText='First Name' placeHolderText='First Name' />
          <InputTextBox labelText='Last Name' placeHolderText='Last Name' />
          <div className="flex-grow">
            <InputTextBox labelText='Organization' placeHolderText='Organization (optional)' inputWidth={80} />
          </div>
        </FormSection>
        <FormSection  titleLabel='Property Details'>
          <InputTextBox labelText='Postal Code' placeHolderText='A1B-2C3' />
          <InputTextBox labelText='Street Number' placeHolderText='Street # (optional)' />
          <div className="flex-grow">
            <InputTextBox labelText='Street Name' placeHolderText='Street name (optional)' inputWidth={80} />
          </div>
        </FormSection>
        <FormSection titleLabel='Ratings and Review' displayRow={true}>
          <RatingsCollection />
          <InputTextBox labelText='Title' placeHolderText='Review Title' inputWidth={75} />
          <ReviewTextInput labelText='Review' placeHolderText='Write your Review' />
        </FormSection>
        <button className="rounded-full bg-transparent border-2 border-white" onClick={handleSubmit}>Submit</button>
      </main>
    </>
  );
};

export default NewReview;