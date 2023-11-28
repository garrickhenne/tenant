import NavButton from './NavButton';
import { Link } from 'react-router-dom';
import { authContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import LogoutButton from './LogoutButton';

const NavBar = () => {
  const { user } = useContext(authContext);

  return(
    <nav className="flex justify-between mb-10">
      <Link to='/'>
        <p className='font-medium text-5xl cursor-default'>tenant</p>
      </Link>
      <div id="nav-buttons" className="flex align-middle">
        <NavButton name='Search' path='search' />
        <NavButton name='Reviews' path='reviews' />
        <NavButton name='About us' path='about' />
        {!user && <NavButton name='Sign up' path='/signup' /> }
        {!user && <NavButton name='Login' path='login' /> }
        {user && <NavButton name='Account' path='account' />}
        {user && <LogoutButton />}
      </div>
    </nav>
  );
};

export default NavBar;