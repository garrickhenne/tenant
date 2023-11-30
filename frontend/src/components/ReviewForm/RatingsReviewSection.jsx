import FormSection from "./FormSection";
import RatingsCollection from "./RatingsCollection";
import InputTextBox from "./InputTextBox";
import ReviewTextInput from "./ReviewTextInput";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";

const RatingsReviewSection = () => {
  const { reviewRating } = useContext(newReviewContext);
  const { title, setTitle, review, setReview } = reviewRating;

  return(
    <FormSection titleLabel='Ratings and Review' displayRow={true}>
      <RatingsCollection />
      <InputTextBox labelText='Title' placeHolderText='Review Title' minWidth={'min-w-[80%]'} val={title} setVal={setTitle} />
      <ReviewTextInput labelText='Review' placeHolderText='Write your Review' val={review} setVal={setReview} />
    </FormSection>
  );
};

export default RatingsReviewSection;