import Score from './Score';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <section
      className="w-full p-6 rounded-lg max-w-2xl shadow-lg shadow-gray-300 bg-white"
    >
      <header className="flex items-center mb-1">

        <h3 className="font-medium text-lg">"{reviewTitle}"</h3>

      </header>
      <h3 className="font-medium text-lg mb-2">{landlord.lastName}, {landlord.firstName}</h3>
      <p className="text-left whitespace-normal ">
        {reviewDesc}
      </p>
      <section className="py-4 grid grid-cols-2 gap-x-6">
        <Score text="Health and Safety" score={healthSafety}></Score>
        <Score text="Respect" score={respect}></Score>
        <Score text="Repair" score={repair}></Score>
        <Score text="Sentiment" score={sentiment}></Score>

      </section>

      {/* Overall Score */}
      <footer className="border-t border-gray-100 pt-4">
        <Score text="Overall Score"></Score>
      </footer>
    </section>
  );
};

export default Test;