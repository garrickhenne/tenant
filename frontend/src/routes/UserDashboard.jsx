import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Review from "../components/Review/Review";
import { authContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const { user } = useContext(authContext);
  const [dashboard, setDashboard] = useState([]);

  // Get the reviews.  Authentication handled in backend
  useEffect(() => {
    axios.get(`/api/dashboard`)
      .then(response => {
        const dashboardFetch = response.data;

        // Set the state with the fetched data
        setDashboard(dashboardFetch);
      })
      .catch(error => {
        console.error('Error fetching dashboard:', error);
      });
  }, []);

  if (!user) {
    return <Navigate to='/' />;
  }

  const itemAnimProp = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };

  return (
    <div>
      {/* Tailwind */}
      <h1 className=
        'font-small font-default font-bold text-3xl cursor-default text-red-200'>
        Dashboard for {user}
      </h1>
      <ul className='m-0 grid grid-cols-2'>

        {/* Go through each review and assign render a Review Component */}
        {dashboard.map((item, index) => {
          return (<motion.li
            className="m-10"
            key={item._id}
            variants={itemAnimProp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <Review key={item._id} item={item} />
          </motion.li>);
        })}
      </ul>
    </div>
  );
};

export default UserDashboard;