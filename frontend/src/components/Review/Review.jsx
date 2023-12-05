import Score from './Score';
import { useNavigate } from 'react-router-dom';
import HealthIcon from './icons/Health';
import RespectIcon from './icons/Respect';
import RepairIcon from './icons/Repair';
import SentimentIcon from './icons/Sentiment';
import OverallScoreIcon from './icons/OverallScore';
import EditIcon from './icons/Edit';
import { motion } from "framer-motion";
import {
  getSentimentText,
  getSentimentPercentage,
  getDisplayScore,
  getOverallDisplayScore,
  getPercentage,
  getOverallScorePercentage
} from '../../helpers/ComponentHelper';

// Tailwind Component from:
// https://tailwindcomponents.com/component/area-liveability-score

// SVG icons from:
// https://reactsvgicons.com/search?q=edit&page=1

const Review = function(props) {

  const navigate = useNavigate();

  const item = props.item;

  const reviewTitle = item.title;
  const reviewDesc = item.description;
  const sentiment = item.sentiment;
  const healthSafety = item.healthSafety;
  const respect = item.respect;
  const repair = item.repair;
  const overallScore = item.overallScore;
  const landlord = item.landlordId;

  const reviewId = item._id;

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <section
      className="w-full h-full p-6 rounded-lg max-w-2xl shadow-lg shadow-gray-500 bg-white"
    >
      <header className="flex justify-between items-center mb-1">

        {/* Title Review + Edit Button */}
        <h3 className="font-medium text-lg">"{reviewTitle}"</h3>
        <motion.button
          whileHover={{
            scale: 1.5,
            transition: { duration: 0.25 },
          }}
          style={{ 'all': 'unset' }}
        >
          <EditIcon onClick={handleSubmit}></EditIcon>
        </motion.button>

      </header>

      {/* Landlord Name */}
      <h3 className="font-bold text-lg mb-2">{landlord.lastName}, {landlord.firstName}</h3>

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

export default Review;
