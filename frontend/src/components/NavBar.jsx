import NavButton from './NavButton';

const NavBar = () => {

  return(
    <nav className="flex justify-between mb-10">
      <p className='font-medium text-5xl cursor-default'>tenant</p>
      <div id="nav-buttons" className="flex align-middle">
        <NavButton name='Search'/>
        <NavButton name='Reviews'/>
        <NavButton name='About us'/>
        <NavButton name='Sign up'/>
        <NavButton name='Login'/>
      </div>
    </nav>
  );
};

export default NavBar;