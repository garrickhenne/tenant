import FormSection from "./FormSection";
import InputTextBox from "./InputTextBox";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";
import AutoCompleteInput from "./AutoCompleteInput";
import IconHouse from "./icons/IconHouse";

const PropertySection = () => {
  const { property } = useContext(newReviewContext);
  const { postCode, setPostCode, streetNumber, setStreetNumber, streetName, setStreetName } = property;

  // Property expects landlord do be filled in already in order to have properties searchable.
  return(
    <FormSection  titleLabel='Property Details' icon={IconHouse} formClassName={'p-7 flex gap-x-8 gap-y-5 flex-col w-[90%]'}>
      <AutoCompleteInput val={postCode} setVal={setPostCode} />
      <div className="flex flex-row gap-x-10">
        <InputTextBox labelText='Street Number' placeHolderText='Street #' val={streetNumber} setVal={setStreetNumber} />
        <InputTextBox labelText='Street Name' placeHolderText='Street name' minWidth={'min-w-[80%]'} val={streetName} setVal={setStreetName} />
      </div>
    </FormSection>
  );
};

export default PropertySection;