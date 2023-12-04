import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gauge from "../components/LandlordView/Gauge";
import { calculateAverageRatings } from "../helpers/LandlordHelpers";
import ReviewsList from "../components/LandlordView/ReviewsList";
import { motion } from 'framer-motion';
import SentimentGauge from "../components/LandlordView/SentimentGauge";

const Landlord = () => {
  const { landlordId } = useParams();
  const [landlordData, setLandlordData] = useState({});
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'tenant | Landlord';

    return () => document.title = oldTitle;
  }, []);

  useEffect(() => {
    const params = { landlordId };
    axios.get('/api/landlords', { params })
      .then(response => response.data)
      .then(landlord => {
        console.log(landlord);
        setLandlordData(() => ({
          ...landlord
        }));
      })
      .catch(err => {
        console.log('something went wrong...', err);
      });
  }, [landlordId]);

  useEffect(() => {
    if (Object.keys(landlordData).length === 0) return;
    setAverageRatings(() => ({ ...calculateAverageRatings(landlordData.reviews) }));
  }, [landlordData]);

  // Landlord should have state of list of reviews associated with landlord.
  // For the ratings, each review should have repair, healthSafety, repect ratings and we calc from there.
  // We also render the list of reviews.
  return landlordData.landlord && (
    <motion.main className="flex flex-col items-center gap-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="self-start ml-14 text-white">{ landlordData.landlord.firstName } { landlordData.landlord.lastName }</h1>
      <section className="flex flex-row gap-x-28 items-center">
        {averageRatings && <Gauge label={'Overall'} value={averageRatings.overall} fill="#C0D434" isOverall />}
        {averageRatings && <SentimentGauge value={averageRatings.sentiment} />}
      </section>
      <section className="flex flex-row gap-x-10 p-5">
        {averageRatings && <Gauge label={'Repair'} value={averageRatings.repair}/>}
        {averageRatings && <Gauge label={'Respect'} value={averageRatings.respect}/>}
        {averageRatings && <Gauge label={'Safety'} value={averageRatings.safety}/>}
      </section>
      <h1 className="self-start ml-14 text-white">Reviews</h1>
      <section>
        {landlordData.reviews && <ReviewsList reviews={landlordData.reviews} />}
      </section>
    </motion.main>
  );
};

export default Landlord;
