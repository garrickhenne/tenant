import HealthIcon from "./icons/Health";

const Score = function(props) {

  if (props.text === 'Sentiment') {

  }

  const percentage = `${(props.score / 5) * 100}%`;
  console.log(props.text, percentage);
  return (
    <div class="flex items-center py-3">
      <HealthIcon></HealthIcon>
      <div class="space-y-3 flex-1">
        <div class="flex items-center">
          <h4
            class="font-medium text-sm mr-auto text-gray-700 flex items-center"
          >
            {props.text}
          </h4>
          <span class="px-2 py-1 rounded-lg bg-red-50 text-blue-700 text-xs">
            {props.score}/5
          </span>
        </div>
        <div class="overflow-hidden bg-blue-50 h-1.5 rounded-full w-full">
          <span
            class="h-full bg-blue-500 w-full block rounded-full"
            style={{ width: percentage }}
          ></span>
        </div>
      </div>
    </div >
  );
};

export default Score;