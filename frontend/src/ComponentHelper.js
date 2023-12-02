const CAT_MAX_SCORE = 5;
const OVERALL_MAX_SCORE = 100;

const getSentimentText = function(number) {

  let displayScore = Math.round(((number + 1) / 2) * 100);
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
  return displayScore;
};

const getSentimentPercentage = (num) => {
  const percent = Math.round(((num + 1) / 2) * 100);
  return `${percent}%`;
};

const getDisplayScore = (num) => {
  return `${num}/${CAT_MAX_SCORE}`;
};

const getOverallDisplayScore = (num) => {
  return `${num * 100}/${OVERALL_MAX_SCORE}`;
};

const getPercentage = (num) => {
  return `${(num / CAT_MAX_SCORE) * 100}%`;
};

const getOverallScorePercentage = (num) => {
  return `${num * 100}%`;
};

export {
  getSentimentText,
  getSentimentPercentage,
  getDisplayScore,
  getOverallDisplayScore,
  getPercentage,
  getOverallScorePercentage
};