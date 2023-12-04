import FormSection from "./FormSection";
import RatingsCollection from "./RatingsCollection";
import IconHandThumbsUp from "./icons/IconHandThumbsUp";

const RatingsSection = () => {

  return (
    <FormSection titleLabel='Rating' icon={IconHandThumbsUp}>
      <RatingsCollection />
    </FormSection>
  );
};

export default RatingsSection;
