import FormSection from "./FormSection";
import InputTextBox from "./InputTextBox";
import ReviewTextInput from "./ReviewTextInput";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import IconWrite from "./icons/IconWrite";

const ReviewSection = ({isEdit, handleSubmit}) => {
  const { reviewRating } = useContext(newReviewContext);
  const { title, setTitle, review, setReview } = reviewRating;

  return(
    <FormSection titleLabel='Review' icon={IconWrite} formClassName={'p-7 flex flex-col items-center gap-x-8 gap-y-5 items-stretch'}>
      <InputTextBox labelText='Title' placeHolderText='Review Title' minWidth={'min-w-[80%]'} val={title} setVal={setTitle} />
      <ReviewTextInput labelText='Review' placeHolderText='Write your Review' val={review} setVal={setReview} />
      <button className="rounded-full bg-transparent border-2 border-gray-500 self-end" onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Submit'}</button>
    </FormSection>
  );
};

export default ReviewSection;