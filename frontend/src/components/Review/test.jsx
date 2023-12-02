import Score from './Score';
import { useNavigate } from 'react-router-dom';
import HealthIcon from './icons/Health';
import RespectIcon from './icons/Respect';
import RepairIcon from './icons/Repair';
import SentimentIcon from './icons/Sentiment';
import OverallScoreIcon from './icons/OverallScore';
import EditIcon from './icons/Edit';

const Test = function(props) {

  const navigate = useNavigate();

  const item = props.item;

  const reviewTitle = item.title;
  const reviewDesc = item.description;
  const sentiment = item.sentiment;
  const healthSafety = item.healthSafety;
  const respect = item.respect;
  const repair = item.repair;

  const landlord = item.landlordId;

  const reviewId = item._id;

  const overallScore = 50;

  const categoryMaxScore = 5;
  const overallMaxScore = 100;

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <section
      className="w-full p-6 rounded-lg max-w-2xl shadow-lg shadow-gray-300 bg-white"
    >
      <header className="flex justify-between items-center mb-1">

        <h3 className="font-medium text-lg">"{reviewTitle}"</h3>
        <EditIcon onClick={handleSubmit}></EditIcon>
      </header>
      <h3 className="font-medium text-lg mb-2">{landlord.lastName}, {landlord.firstName}</h3>
      <p className="text-left whitespace-normal ">
        {reviewDesc}
      </p>
      <section className="py-4 grid grid-cols-2 gap-x-6">
        <Score
          icon={HealthIcon}
          text="Health and Safety"
          score={healthSafety}
          maxScore={categoryMaxScore}>
        </Score>
        <Score
          icon={RespectIcon}
          text="Respect"
          score={respect}
          maxScore={categoryMaxScore}>
        </Score>
        <Score
          icon={RepairIcon}
          text="Repair"
          score={repair}
          maxScore={categoryMaxScore}>
        </Score>
        <Score
          icon={SentimentIcon}
          text="Sentiment"
          score={sentiment}
          maxScore={categoryMaxScore}>
        </Score>
      </section>

      {/* Overall Score */}
      <footer className="border-t border-gray-100 pt-4">
        <Score icon={OverallScoreIcon} text="Overall Score" score={overallScore} maxScore={overallMaxScore}></Score>
      </footer>
    </section>
  );
};

export default Test;