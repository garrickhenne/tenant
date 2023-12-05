import FormSection from "./FormSection";
import InputTextBox from "./InputTextBox";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import IconPersonCircle from './icons/IconPersonCircle';

const LandlordSection = () => {
  const { landlord } = useContext(newReviewContext);
  const { firstName, setFirstName, lastName, setLastName, organization, setOrganization } = landlord;

  return(
    <FormSection  titleLabel='Landlord Details' icon={IconPersonCircle} formClassName={'p-7 flex gap-x-8 gap-y-5 flex-col'}>
      <div className="flex flex-row gap-x-8">
        <InputTextBox labelText='First Name' placeHolderText='First Name' val={firstName} setVal={setFirstName} />
        <InputTextBox labelText='Last Name' placeHolderText='Last Name' val={lastName} setVal={setLastName} />
      </div>
      <div className="flex-grow">
        <InputTextBox labelText='Organization' placeHolderText='Organization (optional)' minWidth={'min-w-[80%]'} val={organization} setVal={setOrganization} />
      </div>
    </FormSection>
  );
};

export default LandlordSection;