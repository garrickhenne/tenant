import { useContext } from "react";
import { authContext } from "../providers/AuthProvider";
import { Navigate } from 'react-router-dom';
import ReviewForm from "../components/ReviewForm/ReviewForm";
import NewReviewProvider from "../providers/NewReviewProvider";

const NewReview = () => {
  const { user } = useContext(authContext);

  if (!user) {
    <Navigate to='/' />;
  }

  return(
    <NewReviewProvider>
      <ReviewForm />
    </NewReviewProvider>
  );
};

export default NewReview;