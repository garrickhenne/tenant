import { useState, useContext } from "react";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { authContext } from "../providers/AuthProvider";

const LOGIN_URL = 'http://localhost:8000/login';

const LoginForm = () => {
  const { user, login } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(LOGIN_URL, { email, password }, { withCredentials: true })
      .then(response => login(response.data))
      .catch(err => console.log(err));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // If user cookie has been set, redirect to home page.
  if (user) {
    return <Navigate to='/' />;
  }

  return(
    <form className="flex flex-col items-center p-10" onSubmit={ handleSubmit }>
      <label>Email</label>
      <input
        type="email"
        className="w-1/2 bg-transparent border-solid border-2 border-white rounded-full"
        placeholder="Enter your email"
        onChange={ handleEmailChange }
      />
      <label>Password</label>
      <input
        type="password"
        className="w-1/2 bg-transparent border-solid border-2 border-white rounded-full"
        placeholder="Password"
        onChange={ handlePasswordChange }
      />
      <button type="submit" className="bg-transparent border-solid border-2 border-white rounded-full">Login</button>
    </form>
  );
};

export default LoginForm;