import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  // this defines every single parameter for the user that we need to send back to the backend
  // each line creates a variable and function depending on what is passed in
  const [userName, setUserName] = useState(''); //(existingUser.userName || "");
  const [email, setEmail] = useState('');//existingUser.email || "");
  const [password, setPassword] = useState('');//existingUser.password || "");
  const [confirmPassword, setConfirmPassword] = useState('');//existingUser.confirmPassword || "");

  const setEmail = (e) => {
    setEmail(e.target.value);
  };

  const setPassword = (e) => {
    setPassword(e.target.value);
  };

  const setPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const setConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
	          // stops page from refreshing
        e.preventDefault()
        // creates a data list that we will need to pass to the backend
        const data = {
            userName,
            email,
            password,
            confirmPassword
        }
        // this defines our URL so that we correctly access the backend with the right user and are able to change it
        const url = "http://127.0.0.1:5000/api/signup"// + (updating ? `update_user/${existinguser.id}` : "create_user")

        // tells the website what method we plan to use and jsonifies the data so that backend can read it
        const options = {
            method: "POST",//updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        // waits for the fetch command to finish running and saves the data in response
        const response = await fetch(url, options)

        // depending on if this was successful we get a status back
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
	  };

  return (
    <div>
      <h1 className='signUp'>{isSignUp ? 'Sign Up to Hobby Gator' : 'Login to HobbyGator'}</h1>

      <form className='form' onSubmit={handleSubmit}>

        <label htmlFor="userName">User Name:</label>
        <input type="text" id="userName" value={userName} onChange={setUserName}/>

        <label className='label'>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />

        <label className='label'>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />

        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        <button type="button">Continue with Google</button>
        
      </form>
    </div>
  );
};

export default SignUp;
