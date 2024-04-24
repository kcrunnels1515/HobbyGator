import React, { useState } from 'react';
//import { useNavigate } from "react-router-dom";
import './Login.css';
import Home from '../home/Home';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loggedin, setLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
   	e.preventDefault();

        // creates a data list that we will need to pass to the backend
           const send_data = {
               "username": username,
               "passwd": password,
           }

           // this defines our URL so that we correctly access the backend with the right user and are able to change it
           const url = "/user/login"// + (updating ? `update_user/${existinguser.id}` : "create_user")

           // tells the website what method we plan to use and jsonifies the data so that backend can read it
           const options = {
               method: "POST",//updating ? "PATCH" : "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(send_data)
           }
           // waits for the fetch command to finish running and saves the data in response
           const response = await fetch(url, options)

           // depending on if this was successful we get a status back
           if (response.status !== 201 && response.status !== 200) {
             const data = await response.json()
             alert(data.message)
           }
        if(response.status === 200)
        {
            setLoggedIn(true)
            alert("Logged in.")
        }
       };
    if (!loggedin) {
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
		     </form>
		   </div>
		 );
    } else {
        return ( <Home /> );
    }
};

export default Login;
