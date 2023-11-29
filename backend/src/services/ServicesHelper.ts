const MAX_STARS: number = 5;

// Gets a score out of 100, 2 decimal places
export const getCalculatedReviewScore = function (
  healthSafety: number,
  respect: number,
  repair: number,
  sentiment: number
): number {

  // number = prim. type, Number = object type
  let reviewScore = 0;
  const percenHealthSafety: number = healthSafety / MAX_STARS;
  const percenRespect: number = respect / MAX_STARS;
  const percenRepair: number = repair / MAX_STARS;
  const percenSentiment: number = getSentimentPercentage(sentiment);

  reviewScore = (percenHealthSafety + percenRespect + percenRepair + percenSentiment) / 4;

  let truncatedNumber = Math.floor(reviewScore * 100) / 100;

  return truncatedNumber;
};

// Score Range
// 0.25 — 1.0
// -0.25 — 0.25
// -1.0 — -0.25
const getSentimentPercentage = function (sentiment: number): number {

  // shift the entire scale by 1
  // a sentiment score of 50% or 0.5 is neutral.
  // anything below / higher means lower and higher sentimment, respectively.
  return (sentiment + 1) / 2;
};