import { useEffect, useState } from "react";
import axios from 'axios';

function UserDashboard() {

  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    axios.get(`/api/dashboard`)
      .then(response => {
        const dashboardFetch = response.data;
        console.log(dashboardFetch);
        setDashboard(dashboard);
      });
  }, []);

  return (
    <div>
      {/* Tailwind */}
      <h1 className='text-3xl font-bold underline'>
        Dashboard for user
      </h1>
    </div>
  );
}

export default UserDashboard;