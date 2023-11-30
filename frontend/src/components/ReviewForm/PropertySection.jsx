import FormSection from "./FormSection";
import InputTextBox from "./InputTextBox";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import AutoCompleteInput from "./AutoCompleteInput";

const PropertySection = () => {
  const { property } = useContext(newReviewContext);
  const { postCode, setPostCode, streetNumber, setStreetNumber, streetName, setStreetName } = property;

  // Property expects landlord do be filled in already in order to have properties searchable.
  return(
    <FormSection  titleLabel='Property Details'>
      <div className="flex-grow">
        <AutoCompleteInput val={postCode} setVal={setPostCode} />
      </div>
      <InputTextBox labelText='Street Number' placeHolderText='Street #' val={streetNumber} setVal={setStreetNumber} />
      <div className="flex-grow">
        <InputTextBox labelText='Street Name' placeHolderText='Street name' minWidth={'min-w-[80%]'} val={streetName} setVal={setStreetName} />
      </div>
    </FormSection>
  );
};

export default PropertySection;