import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Review from "./Review";
import { authContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

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

  return (
    <div>
      {/* Tailwind */}
      <h1 className='text-3xl font-bold underline'>
        Dashboard for { user }
      </h1>
      <div>
        {/* Go through each review and assign render a Review Component */}
        {dashboard.map(item => {
          console.log(item);
          return <Review key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default UserDashboard;