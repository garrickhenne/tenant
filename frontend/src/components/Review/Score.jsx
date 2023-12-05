
const Score = function(props) {

  const IconComponent = props.icon;

  return (
    <div className="flex items-center py-3">
      <IconComponent />
      <div className="space-y-3 flex-1">
        <div className="flex items-center">
          <h4
            className="font-medium text-sm mr-auto text-gray-700 flex items-center"
          >
            {props.text}
          </h4>
          <span className="px-2 py-1 rounded-lg bg-red-50 text-blue-700 text-xs">
            {props.displayScore}
          </span>
        </div>
        <div className="overflow-hidden bg-blue-100 h-1.5 rounded-full w-full">
          <span
            className="h-full bg-blue-500 w-full block rounded-full"
            style={{ width: props.percentage }}
          ></span>
        </div>
      </div>
    </div >
  );
};

export default Score;