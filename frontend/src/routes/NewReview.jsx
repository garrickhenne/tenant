import { useContext, useEffect } from "react";
import { authContext } from "../providers/AuthProvider";
import { Navigate } from 'react-router-dom';
import ReviewForm from "../components/ReviewForm/ReviewForm";
import NewReviewProvider from "../providers/NewReviewProvider";

const NewReview = () => {
  const { user } = useContext(authContext);
  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'tenant | New Review';

    return () => document.title = oldTitle;
  }, []);

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