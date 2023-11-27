import NavButton from './NavButton';
import { Link } from 'react-router-dom';

const NavBar = () => {

  return(
    <nav className="flex justify-between mb-10">
      <Link to='/'>
        <p className='font-medium text-5xl cursor-default'>tenant</p>
      </Link>
      <div id="nav-buttons" className="flex align-middle">
        <NavButton name='Search' path='search' />
        <NavButton name='Reviews' path='reviews' />
        <NavButton name='About us' path='about' />
        <NavButton name='Sign up' path='/signup' />
        <NavButton name='Login' path='login' />
      </div>
    </nav>
  );
};

export default NavBar;