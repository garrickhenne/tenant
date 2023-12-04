import { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useContext(authContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    console.log(newUser);
    axios.post('/api/signup', newUser)
      .then(response => {
        console.log(response.data);
        login(response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="signup">
      <form className="signup-fields flex flex-col items-center py-10 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col w-1/2 max-w-[33%]">
          <label className="text-left ml-3 mb-1 text-slate-200">Username:</label>
          <input
            className="pl-4 bg-transparent border-solid border-2 border-white rounded-full h-11 text-slate-200 focus:outline-none focus:shadow-md transition-shadow"
            placeholder="Enter a username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2 max-w-[33%]">
          <label className="text-left ml-3 mb-1 text-slate-200">Email:</label>
          <input
            className="pl-4 bg-transparent border-solid border-2 border-white rounded-full h-11 text-slate-200 focus:outline-none focus:shadow-md transition-shadow"
            placeholder="Enter a valid email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2 max-w-[33%]">
          <label className="text-left ml-3 mb-1 text-slate-200">Password:</label>
          <input
            className="pl-4 bg-transparent border-solid border-2 border-white rounded-full h-11 text-slate-200 focus:outline-none focus:shadow-md transition-shadow"
            placeholder="Enter a password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2 max-w-[33%]">
          <label className="text-left ml-3 mb-1 text-slate-200">Confirm password:</label>
          <input
            className="pl-4 bg-transparent border-solid border-2 border-white rounded-full h-11 text-slate-200 focus:outline-none focus:shadow-md transition-shadow"
            placeholder="Confirm your password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button className="min-w-[18%] bg-transparent border-solid border-2 border-white rounded-full text-slate-200">Create account</button>
      </form>
    </div>
  );
};

export default SignupForm;