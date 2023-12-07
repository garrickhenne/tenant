import { useNavigate, useLocation } from 'react-router-dom';
import { authContext } from "../providers/AuthProvider";
import { useContext } from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(authContext);

  let isMapPath = false;
  const location = useLocation();
  if (location.pathname === "/map") {
    isMapPath = true;
  }

  const handleClick = () => {
    axios.get('/api/logout')
      .then(() => {
        logout();
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  if (!user) {
    navigate('/');
  }

  return (
    <button
      className={`mx-1 rounded-full font-medium bg-transparent border-solid border-2 border-white text-white shadow-xl focus:outline-none ${isMapPath ? 'bg-red-400' : ''}`}
      onClick={handleClick}
    >
      Logout
    </button>
  );
};

export default LogoutButton;