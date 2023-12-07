import { useNavigate, useLocation } from 'react-router-dom';
import { authContext } from "../providers/AuthProvider";
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(authContext);

  const [isMapPath, setIsMapPath] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === '/map') {
      setIsMapPath(true);
      return;
    }
    setIsMapPath(false);
  }, [location]);

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