import FormSection from "./FormSection";
import InputTextBox from "./InputTextBox";
import { useContext } from "react";
import { newReviewContext } from "../../providers/NewReviewProvider";

const PropertySection = () => {
  const { property } = useContext(newReviewContext);
  const { postCode, setPostCode, streetNumber, setStreetNumber, streetName, setStreetName } = property;

  return(
    <FormSection  titleLabel='Property Details'>
      <InputTextBox labelText='Postal Code' placeHolderText='A1B-2C3' val={postCode} setVal={setPostCode} />
      <InputTextBox labelText='Street Number' placeHolderText='Street # (optional)' val={streetNumber} setVal={setStreetNumber} />
      <div className="flex-grow">
        <InputTextBox labelText='Street Name' placeHolderText='Street name (optional)' inputWidth={80} val={streetName} setVal={setStreetName} />
      </div>
    </FormSection>
  );
};

export default PropertySection;