import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const NavButton = ({ name, path }) => {

  const [isMapPath, setIsMapPath] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === '/map') {
      setIsMapPath(true);
      return;
    }
    setIsMapPath(false);
  }, [location]);

  return (
    <Link
      to={path}
    >
      <button className={`mx-1 rounded-full font-medium bg-transparent border-solid border-2 border-white shadow-xl focus:outline-none ${isMapPath ? 'bg-red-400' : ''}`}>
        {name}
      </button>
    </Link>
  );
};

export default NavButton;