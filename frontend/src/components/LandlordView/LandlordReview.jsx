import MiniSentimentGauge from "./MiniSentimentGauge";
import ReadOnlyStarRating from "./ReadOnlyStarRating";

const LandlordReview = ({ review }) => {
  return (
    <article className="flex flex-col gap-y-4 border-2 border-white rounded-2xl p-5 text-start basis-[45%]">
      <h2 className="text-4xl">{ review.title }</h2>
      <div className="flex flex-col gap-y-2">
        <ReadOnlyStarRating  value={review.healthSafety} label='Health and Safety' />
        <ReadOnlyStarRating  value={review.repair} label='Repair' />
        <ReadOnlyStarRating  value={review.respect} label='Respect' />
        <div className="flex flex-row gap-x-3">
          <p>Sentiment:</p>
          <MiniSentimentGauge value={review.sentiment} />
        </div>
      </div>
      { review.description } <br />
    </article>

  );
};

export default LandlordReview;
