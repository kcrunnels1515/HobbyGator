import React, { useState } from 'react';
import './Login.css';

async function loginUser(credentials){
	return fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
	.then(data => data.json());
};

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
	  e.preventDefault();
	  const token = await loginUser({
		  email,
		  password
	  });
	  setToken(token);
  };

  return (
    <div>
      <h1 className='login'>Login to HobbyGator</h1>

      <form className='form' onSubmit={handleSubmit}>

        <label className='label'>Email:</label>

        <input type="email" value={email} onChange={handleEmailChange} />

        <label className='label'>Password:</label>

        <input type="password" value={password} onChange={handlePasswordChange} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
