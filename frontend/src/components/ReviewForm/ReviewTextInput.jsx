const ReviewTextInput = ({ labelText, placeHolderText }) => {

  return(
    <div className="text-start gap-y-1 w-auto">
      <p>{ labelText }</p>
      <textarea name="" id="" cols="30" rows="10" placeholder={ placeHolderText } className="bg-transparent border border-white rounded-sm p-3 w-[90%]"></textarea>
    </div>
  );
};

export default ReviewTextInput;