import LandlordReview from "./LandlordReview";

const ReviewsList = ({ reviews }) => {
  return (
    <ul className="flex flex-col gap-y-4">
      { reviews.map(review => (
        <LandlordReview review={ review } key={ review._id } />
      ))}
    </ul>
  );
};

export default ReviewsList;
