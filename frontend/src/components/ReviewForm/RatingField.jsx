import { Rating } from '@mui/material';
import { useState } from 'react';

const RatingField = ({ label }) => {
  const [rating, setRating] = useState(1);

  return (
    <div className='flex flex-col items-start'>
      <p>{ label }</p>
      <Rating
        name='simple-controlled'
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
    </div>
  );
};

export default RatingField;