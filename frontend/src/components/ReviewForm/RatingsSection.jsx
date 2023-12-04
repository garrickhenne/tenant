import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import FormSection from "./FormSection";
import RatingsCollection from "./RatingsCollection";

const RatingsSection = () => {

  return (
    <FormSection titleLabel='Rating' displayRow={true}>
      <RatingsCollection />
    </FormSection>
  );
};

export default RatingsSection;
