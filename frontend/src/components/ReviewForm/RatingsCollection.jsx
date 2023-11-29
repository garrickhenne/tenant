import RatingField from "./RatingField";

const RatingsCollection = () => {

  return(
    <div className="flex flex-row gap-x-16">
      <RatingField label='Health & Safety' />
      <RatingField label='Respect' />
      <RatingField label='Repair' />
    </div>
  );
};

export default RatingsCollection;