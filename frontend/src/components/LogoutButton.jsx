import { Navigate } from 'react-router-dom';
import { authContext } from "../providers/AuthProvider";
import { useContext } from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const { user, logout } = useContext(authContext);
  const handleClick = () => {
    axios.get('/api/logout', { withCredentials: true })
      .then(() => logout())
      .catch((err) => console.log(err));
  };

  if (!user) {
    <Navigate to='/' />;
  }

  return(
    <button
      className="mx-1 rounded-full font-medium bg-transparent border-solid border-2 border-white"
      onClick={ handleClick }
    >
        Logout
    </button>
  );
};

export default LogoutButton;