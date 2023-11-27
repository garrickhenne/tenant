import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Signup from './routes/Signup';
import Home from './routes/Home';
import Login from './routes/Login';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;