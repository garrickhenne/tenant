import NavButton from './NavButton';

const NavBar = () => {

  return(
    <nav className="flex">
      tenant
      <div id="nav-buttons" className="flex">
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