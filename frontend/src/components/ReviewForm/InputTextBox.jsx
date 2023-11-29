const InputTextBox = ({ labelText, placeHolderText, inputWidth }) => {

  return(
    <div className="text-start gap-y-1 w-auto">
      <p>{ labelText }</p>
      <input type="text" placeholder={ placeHolderText } className={`bg-transparent border border-white rounded-sm pl-3 h-9 w-[${inputWidth || 100}%]`} />
    </div>
  );
};

export default InputTextBox;