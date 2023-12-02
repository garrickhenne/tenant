import HealthIcon from "./icons/Health";

const Score = function(props) {

  const maxScore = props.maxScore;

  const IconComponent = props.icon;

  let displayScore = `${props.score}/${maxScore}`;
  let percentage = `${(props.score / maxScore) * 100}%`;
  if (props.text === 'Sentiment') {
    displayScore = Math.round(((props.score + 1) / 2) * 100);
    if (displayScore > 0 && displayScore < 25) {
      displayScore = 'Scorned';
    }
    if (displayScore >= 25 && displayScore < 40) {
      displayScore = 'Disliked';
    }
    if (displayScore >= 40 && displayScore < 60) {
      displayScore = 'Neutral';
    }
    if (displayScore >= 60 && displayScore < 70) {
      displayScore = 'Liked';
    }
    if (displayScore >= 71) {
      displayScore = 'Revered';
    }
    percentage = `${displayScore}%`;
  }

  console.log(props.text, percentage);
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
            {displayScore}
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