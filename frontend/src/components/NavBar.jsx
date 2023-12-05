import NavButton from './NavButton';
import { Link } from 'react-router-dom';
import { authContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import LogoutButton from './LogoutButton';

const NavBar = () => {
  const { user } = useContext(authContext);

  return (
    <nav className="flex justify-between mb-10">
      <Link to='/'>
        <p className='font-medium text-5xl cursor-pointer transition-all'>tenant</p>
      </Link>
      <div id="nav-buttons" className="flex align-middle">
        <NavButton name='Search' path='/' />
        {user && <NavButton name='New Review' path='reviews/new' />}
        <NavButton name='About us' path='about' />
        {!user && <NavButton name='Sign up' path='/signup' />}
        {!user && <NavButton name='Login' path='login' />}
        {user && <NavButton name='Map' path='/map' />}
        {user && <NavButton name='Account' path='/dashboard' />}
        {user && <LogoutButton />}
      </div>
    </nav>
  );
};

export default NavBar;