import { createContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';

export const authContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState('');

  // Run once to check if user has cookie already.
  useEffect(() => {
    const foundCookie = Cookie.get('email');
    if (foundCookie) {
      setUser(foundCookie);
    }
  }, []);

  const login = (email) => {
    setUser(email);
    Cookie.set('email', email);
  };

  const logout = () => {
    setUser('');
    Cookie.set('email', '');
  };

  const userData = { user, login, logout };

  return (
    <authContext.Provider value={userData}>
      { props.children }
    </authContext.Provider>
  );
};

export default AuthProvider;