import { useState, useContext } from "react";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { authContext } from "../providers/AuthProvider";

const LoginForm = () => {
  const { user, login } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', { email, password })
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
    <form className="flex flex-col items-center py-10 space-y-4" onSubmit={ handleSubmit }>
      <div id="login__email" className="flex flex-col w-1/2 max-w-[33%]">
        <label className="text-left ml-3 mb-1 text-slate-200">Email</label>
        <input
          type="email"
          className="pl-4 bg-transparent border-solid border-2 border-white rounded-full h-11 text-slate-200 focus:outline-none focus:shadow-md transition-shadow"
          placeholder="Enter your email"
          onChange={ handleEmailChange }
        />
      </div>
      <div id="login__password" className="flex flex-col w-1/2 max-w-[33%]">
        <label className="text-left ml-3 mb-1 text-slate-200">Password</label>
        <input
          type="password"
          className="pl-4 bg-transparent border-solid border-2 border-white rounded-full h-11 text-slate-200 focus:outline-none focus:shadow-md transition-shadow"
          placeholder="Password"
          onChange={ handlePasswordChange }
        />
      </div>
      <button type="submit" className="min-w-[18%] bg-transparent border-solid border-2 border-white rounded-full text-slate-200">Login</button>
    </form>
  );
};

export default LoginForm;