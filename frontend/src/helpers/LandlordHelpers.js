export const calculateAverageRatings = (reviews) => {
  const repairsAverage = reviews.reduce((prev, curr) => prev + curr.repair, 0) / reviews.length;
  const respectAverage = reviews.reduce((prev, curr) => prev + curr.respect, 0) / reviews.length;
  const safetyAverage = reviews.reduce((prev, curr) => prev + curr.healthSafety, 0) / reviews.length;
  const overall = reviews.reduce((prev, curr) => prev + curr.overallScore, 0) / reviews.length;
  const sentiment = reviews.reduce((prev, curr) => prev + curr.sentiment, 0) / reviews.length;

  return {
    repair: repairsAverage,
    respect: respectAverage,
    safety: safetyAverage,
    overall,
    sentiment
  };
};