import { getSentimentText } from '../../ComponentHelper';

const Score = function(props) {

  const IconComponent = props.icon;

  return (
    <div class="flex items-center py-3">
      <IconComponent />
      <div class="space-y-3 flex-1">
        <div class="flex items-center">
          <h4
            class="font-medium text-sm mr-auto text-gray-700 flex items-center"
          >
            {props.text}
          </h4>
          <span class="px-2 py-1 rounded-lg bg-red-50 text-blue-700 text-xs">
            {props.displayScore}
          </span>
        </div>
        <div class="overflow-hidden bg-blue-100 h-1.5 rounded-full w-full">
          <span
            class="h-full bg-blue-500 w-full block rounded-full"
            style={{ width: props.percentage }}
          ></span>
        </div>
      </div>
    </div >
  );
};

export default Score;