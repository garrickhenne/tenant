const MAX_STARS = 5;

const sentimentPercentage = (sentiment) => {
  return (sentiment + 1) / 2;
};

export const calculateOverallScore = (repairsScore, respectScore, safetyAverage, sentiment) => {
  const overall = ((repairsScore / MAX_STARS) + (respectScore / MAX_STARS) + (safetyAverage / MAX_STARS) + sentimentPercentage(sentiment)) / 4;
  return Math.floor(overall * 100) / 100;
};

export const calculateAverageRatings = (reviews) => {
  const repairsAverage = reviews.reduce((prev, curr) => prev + curr.repair, 0) / reviews.length;
  const respectAverage = reviews.reduce((prev, curr) => prev + curr.respect, 0) / reviews.length;
  const safetyAverage = reviews.reduce((prev, curr) => prev + curr.healthSafety, 0) / reviews.length;
  const sentiment = reviews.reduce((prev, curr) => prev + curr.sentiment, 0) / reviews.length;
  let overall = reviews.reduce((prev, curr) => prev + curr.overallScore, 0) / reviews.length;

  // Edge case for old data if overall is NaN. Manually calculate overall.
  if (isNaN(overall)) {
    overall = calculateOverallScore(repairsAverage, respectAverage, safetyAverage, sentiment);
  }

  return {
    repair: repairsAverage,
    respect: respectAverage,
    safety: safetyAverage,
    overall,
    sentiment
  };
};