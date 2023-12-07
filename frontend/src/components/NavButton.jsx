import { Link, useLocation } from 'react-router-dom';

const NavButton = ({ name, path }) => {

  let isMapPath = false;
  const location = useLocation();
  if (location.pathname === "/map") {
    isMapPath = true;
  }

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