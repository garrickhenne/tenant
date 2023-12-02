import LandlordReview from "./LandlordReview";

const ReviewsList = ({ reviews }) => {
  return (
    <ul className="flex flex-row gap-y-10 gap-x-5 flex-wrap justify-evenly">
      { reviews.map(review => (
        <LandlordReview review={ review } key={ review._id } />
      ))}
    </ul>
  );
};

export default ReviewsList;
