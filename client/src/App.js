import React, { useState } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import Login from "./login/Login"
import SignUp from "./signup/SignUp"


function App() {
	//const [token, setToken] = useState('');

	//if(!token) {
	//	return <Login setToken={setToken} />
	//}
	return (
	  <BrowserRouter>
		<Switch>
	  		<Route path="/login">
				<Login />
			</Route>
			<Route path="/signup">
				<SignUp />
			</Route>
		</Switch>
	  </BrowserRouter>
  );
}

export default App;
