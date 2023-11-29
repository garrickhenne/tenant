const InputTextBox = ({ labelText, placeHolderText, inputWidth, val, setVal }) => {
  const handleChange = (e) => {
    setVal(e.target.value);
  };

  return(
    <div className="text-start gap-y-1 w-auto">
      <p>{ labelText }</p>
      <input type="text" placeholder={ placeHolderText } className={`bg-transparent border border-white rounded-sm pl-3 h-9 w-[${inputWidth || 100}%]`} onChange={ handleChange } value={ val } />
    </div>
  );
};

export default InputTextBox;