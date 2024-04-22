import React, { useState } from 'react';
import './Login.css';

const Login = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
	e.preventDefault();
        // creates a data list that we will need to pass to the backend
        const data = {
            "username": username,
            "passwd": password,
        }
        // Set initial isLoggedIn to false: (this will allow people to post under username)

        // this defines our URL so that we correctly access the backend with the right user and are able to change it
        const url = "/user/login"// + (updating ? `update_user/${existinguser.id}` : "create_user")

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
        }
        if(response.status == 200)
        {
          const data = await response.json()
          alert(data.message);
          // Optionally clear the formL
          setUsername = '';
          setPassword = '';
          setIsLoggedIn = true;
          return data;
        }
	setToken(response.json());
  };

  // Is the user logged in? (this is mainly a test for development)
  function checkIsLoggedIn() {
    return (
      <div>
        {isLoggedIn() ? (
          <p> User logged in!</p>
        ) : (
          <p> ERROR: No user logged in, try again nerd.</p>
        )
        }
      </div>
    )
  }



  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
      <h1 className='login'>Login to HobbyGator</h1>

        <label className='label'>
          Username: 
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>

        <label className='label'>
          Password: 
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>

        <button type="submit">
          Login
        </button>
        <loginStats/>
      </form>
    </div>
  );
};

export default Login;
