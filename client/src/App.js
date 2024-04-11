import React, { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./login/Login"
import SignUp from "./signup/SignUp"
import Forum from "./forum/Forum"
import Home from "./home/Home"
import Navbar from './components/Navbar';
import CreatePost from './create/Create';


function App() {
	//const [token, setToken] = useState('');

	//if(!token) {
	//	return <Login setToken={setToken} />
	//}		/

	// Navigation bar component:
	let Component
	switch(window.location.pathname)
	{
		case "/":
			Component = Home;
			break;
		case "/forum":
			Component = Forum;
			break;		
		case "/login":
			Component = Login;
			break;
		case "/signup":
			Component = SignUp;
			break;
		case "/create":
			Component = CreatePost;
	}	
	return (
		<>
			<Navbar/>
			<Component/>
		</>
	)
}

export default App;
