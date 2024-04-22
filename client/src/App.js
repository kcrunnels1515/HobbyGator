import React, { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
import Forum from "./components/Forum"
import Home from "./pages/home/Home"
import Navbar from './components/Navbar';
import CreatePost from './pages/create/Create';
import Quiz from './pages/quiz/Quiz';
import CreateForum from './pages/create/CreateForum';
import Forums from './pages/forums/Forums';


function App() {
	//const [token, setToken] = useState('');

	//if(!token) {
	//	return <Login setToken={setToken} />
    //}		/
    // 
    // nobody types in the url of the forum they're going to post on, create post should be a component accessible
    // in a particular forum page
    //
	return (
		<>
			<Navbar/>
			<div className='Component'>
				<Routes>
					<Route path="/" element={<Home />} />
       			
					<Route path="/forum/newforum" element={<CreateForum/>} />
					<Route path="/forum/:forum_name" element={<Forum />} />
					<Route path="/forum/post" element={<CreatePost/>} />
					{/*<Route path="/posts/:post_id" element={< />} /> */}
					<Route path="/login" element={<Login />} />
					<Route path="/forum" element = {<Forums/>}/>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/quiz" element={<Quiz/>} />
				</Routes>
			</div>
		</>
	)
}

export default App;
