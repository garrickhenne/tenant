import Rating from '@mui/material/Rating';

const ReadOnlyStarRating = ({ value, label }) => {
  return (
    <div className='flex flex-row gap-x-3 items-center'>
      <p>{label}:</p>
      <Rating readOnly value={value} />
    </div>
  );
};

export default ReadOnlyStarRating;
