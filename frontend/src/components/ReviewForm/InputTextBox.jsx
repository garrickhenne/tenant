const InputTextBox = ({ labelText, placeHolderText, minWidth, val, setVal }) => {

  return(
    <div className="text-start gap-y-1 w-auto">
      <p>{ labelText }</p>
      <input
        type="text"
        placeholder={ placeHolderText }
        className={`bg-transparent border border-gray-600 rounded-lg focus:shadow-md focus:outline-none hover:shadow-md pl-3 h-9 transition-shadow ${minWidth}`}
        onChange={ (e) => setVal(e.target.value) }
        value={ val } />
    </div>
  );
};

export default InputTextBox;