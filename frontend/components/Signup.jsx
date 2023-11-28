import { useState } from "react";
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    console.log(newUser)
    axios.post('http://localhost:8000/signup', newUser)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error('Error:', error)
      });
  };

  return (
    <div className="signup">
      <header className="signup-header">Create an Account</header>
      <form className="signup-fields space-y-4 p-5" onSubmit={handleSubmit}>
        <label className="text-left">Usernames:</label>
        <input
          className="field w-64 h-10 rounded-full border-2 border-white mb-5"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-left">Email:</label>
        <input
          className="field w-64 h-10 rounded-full border-2 border-black mb-5"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-left">Password:</label>
        <input
          className="field w-64 h-10 rounded-full border-2 border-black mb-5"
          type="text"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="text-left">Confirm password:</label>
        <input
          className="field w-64 h-10 rounded-full border-2 border-black mb-5"
          type="text"
          required
          value={confirmPassword}
          onChange={(e) => {setConfirmPassword(e.target.value)}}
        />
        <button>Create account</button>
      </form>
    </div>
  )
};

export default Signup;