const ReviewTextInput = ({ labelText, placeHolderText, val, setVal }) => {

  return(
    <div className="text-start gap-y-1 w-auto">
      <p>{ labelText }</p>
      <textarea name="" id="" cols="30" rows="10" placeholder={ placeHolderText } value={val} onChange={ (e) => setVal(e.target.value) } className="bg-transparent border border-gray-500 rounded-sm focus:shadow-md focus:outline-none hover:shadow-md transition-shadow p-3 w-full"></textarea>
    </div>
  );
};

export default ReviewTextInput;