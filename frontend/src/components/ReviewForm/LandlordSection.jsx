import FormSection from "./FormSection";
import InputTextBox from "./InputTextBox";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";

const LandlordSection = () => {
  const { landlord } = useContext(newReviewContext);
  const { firstName, setFirstName, lastName, setLastName, organization, setOrganization } = landlord;

  return(
    <FormSection  titleLabel='Landlord Details'>
      <InputTextBox labelText='First Name' placeHolderText='First Name' val={firstName} setVal={setFirstName} />
      <InputTextBox labelText='Last Name' placeHolderText='Last Name' val={lastName} setVal={setLastName} />
      <div className="flex-grow">
        <InputTextBox labelText='Organization' placeHolderText='Organization (optional)' inputWidth={90} val={organization} setVal={setOrganization} />
      </div>
    </FormSection>
  );
};

export default LandlordSection;