import { Rating } from '@mui/material';

const RatingField = ({ label, val, setVal }) => {

  return (
    <div className='flex flex-col items-start'>
      <p>{ label }</p>
      <Rating
        name='simple-controlled'
        value={val}
        onChange={(_, newValue) => {
          setVal(newValue);
        }}
      />
    </div>
  );
};

export default RatingField;