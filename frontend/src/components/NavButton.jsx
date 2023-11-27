const NavButton = ({ name }) => {


  return(
    <button className="mx-1 rounded-full font-medium bg-transparent border-solid border-2 border-sky-600">
      { name }
    </button>
  );
};

export default NavButton;