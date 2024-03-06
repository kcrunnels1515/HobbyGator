import React, { useState } from 'react';
import './LoginSignUp.css';

const LoginSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login or sign up logic here
  };

  return (
    <div>
      <h1 className='loginSignUp'>{isSignUp ? 'Sign Up to Hobby Gator' : 'Login to HobbyGator'}</h1>

      <form className='form' onSubmit={handleSubmit}>

        <label className='label'>Email:</label>

        <input type="email" value={email} onChange={handleEmailChange} />

        <label className='label'>Password:</label>

        <input type="password" value={password} onChange={handlePasswordChange} />

        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        <button type="button">Continue with Google</button>
        
      </form>
      <p className='dontHaveAccount'onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
      </p>
    </div>
  );
};

export default LoginSignUp;
