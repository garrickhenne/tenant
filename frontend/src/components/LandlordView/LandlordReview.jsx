import Score from '../Review/Score';
import HealthIcon from '../Review/icons/Health';
import RespectIcon from '../Review/icons/Respect';
import RepairIcon from '../Review/icons/Repair';
import SentimentIcon from '../Review/icons/Sentiment';
import OverallScoreIcon from '../Review/icons/OverallScore';
import {
  getSentimentText,
  getSentimentPercentage,
  getDisplayScore,
  getOverallDisplayScore,
  getPercentage,
  getOverallScorePercentage
} from '../../helpers/ComponentHelper';

const LandlordReview = function({ item }) {

  const reviewTitle = item.title;
  const reviewDesc = item.description;
  const sentiment = item.sentiment;
  const healthSafety = item.healthSafety;
  const respect = item.respect;
  const repair = item.repair;
  const overallScore = item.overallScore;

  return (
    <section
      className={`w-full p-6 border-2 border-white rounded-lg max-w-2xl shadow-lg bg-white basis-[45%] bg-transparent`}
    >
      <header className="flex justify-between items-center mb-1">
        {/* Title Review + Edit Button */}
        <h3 className="font-medium text-lg">&ldquo;{reviewTitle}&rdquo;</h3>
      </header>

      {/* Review */}
      <p className="text-left whitespace-normal italic">
        {reviewDesc}
      </p>

      {/* Score attributes */}
      <section className="py-4 grid grid-cols-2 gap-x-6">
        <Score
          icon={HealthIcon}
          text="Health and Safety"
          displayScore={getDisplayScore(healthSafety)}
          percentage={getPercentage(healthSafety)}>
        </Score>
        <Score
          icon={RespectIcon}
          text="Respect"
          displayScore={getDisplayScore(respect)}
          percentage={getPercentage(respect)}>
        </Score>
        <Score
          icon={RepairIcon}
          text="Repair"
          displayScore={getDisplayScore(repair)}
          percentage={getPercentage(repair)}>
        </Score>
        <Score
          icon={SentimentIcon}
          text="Sentiment"
          displayScore={getSentimentText(sentiment)}
          percentage={getSentimentPercentage(sentiment)}>
        </Score>
      </section>

      {/* Overall Score */}
      {console.log(overallScore)}
      <footer className="border-t border-gray-100 pt-4">
        <Score
          icon={OverallScoreIcon}
          text="Overall Score"
          displayScore={getOverallDisplayScore(overallScore)}
          percentage={getOverallScorePercentage(overallScore)}>
        </Score>
      </footer>
    </section>
  );
};

export default LandlordReview;