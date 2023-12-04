import { Link } from 'react-router-dom';

const NavButton = ({ name, path }) => {


  return (
    <Link
      to={path}
    >
      <button className="mx-1 rounded-full font-medium bg-transparent border-solid border-2 border-white shadow-xl">
        {name}
      </button>
    </Link>
  );
};

export default NavButton;