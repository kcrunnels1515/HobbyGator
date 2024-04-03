import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./login/Login"
import SignUp from "./signup/SignUp"


function App() {
	const [token, setToken] = useState('');

	if(!token) {
		return <Login setToken={setToken} />
	}
	return (
	  <Router>
	  	<Routes>
	  		<Route path="/signup" element={<SignUp />} />
	  	</Routes>
	  </Router>
  );
}
	//  		<Route path="/login" element={<Login />} />

export default App;
