const InputTextBox = ({ labelText, placeHolderText, minWidth, val, setVal }) => {

  return(
    <div className="text-start gap-y-1 w-auto">
      <p>{ labelText }</p>
      <input
        type="text"
        placeholder={ placeHolderText }
        className={`bg-transparent border border-white rounded-sm pl-3 h-9 ${minWidth}`}
        onChange={ (e) => setVal(e.target.value) }
        value={ val } />
    </div>
  );
};

export default InputTextBox;