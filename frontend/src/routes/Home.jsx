import { useContext, useState } from 'react';
import '../App.css';
import { authContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

const Home = () => {
  const { user } = useContext(authContext);
  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default Home;