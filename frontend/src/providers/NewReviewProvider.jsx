import { createContext, useState } from "react";

export const newReviewContext = createContext();

const NewReviewProvider = (props) => {
  // - Landlord first name
  //   - Landlord last name
  //   - Landlord organization(?)

  //   - Property Postal Code
  //   - Property Street Number (?)
  //   - Property Street Name (?)

  //   - Health and Safety Rating
  //   - Respect Rating
  //   - Repair Rating
  //   - Review Title
  //   - Review itself
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');

  const [postCode, setPostCode] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');

  const [healthSafetyRating, setHealthSafetyRating] = useState(3);
  const [repairRating, setRepairRating] = useState(3);
  const [respectRating, setRespectRating] = useState(3);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const value = {
    landlord: {
      firstName,
      setFirstName,
      lastName,
      setLastName,
      organization,
      setOrganization
    },
    property: {
      postCode,
      setPostCode,
      streetNumber,
      setStreetNumber,
      streetName,
      setStreetName
    },
    reviewRating: {
      healthSafetyRating,
      setHealthSafetyRating,
      repairRating,
      setRepairRating,
      respectRating,
      setRespectRating,
      title,
      setTitle,
      review,
      setReview
    }
  };

  return(
    <newReviewContext.Provider value={value}>
      { props.children }
    </newReviewContext.Provider>
  );
};

export default NewReviewProvider;