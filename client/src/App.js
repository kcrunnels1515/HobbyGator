import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./login/Login"
import SignUp from "./signup/SignUp"


function App() {
  return (
	  <Router>
	  	<Routes>
	  		<Route path="/login" element={<Login />} />
	  		<Route path="/signup" element={<SignUp />} />
	  	</Routes>
	  </Router>
  );
}

export default App;
