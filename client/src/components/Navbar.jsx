// REF: Good video explaining basic navbar routing: https://www.youtube.com/watch?v=SLfhMt5OUPI 
// This is just the setup, look into index.js for more info on how it actually works w/ react routing
import './Navbar.css';
import logo from '../image/logo.png'


export default function Navbar()
{
    return (
        <nav className="nav">
            {/* Note: ADD IMAGE LOGO HERE IN PLACE OF THE HOBBBYGATOR NAME */}
            <a className="title"><img src = {logo} alt = "HobbyGator"></img></a>
            <ul> 
                <li> 
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/forum">Forum</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/signup">Sign Up</a>
                </li>
            </ul>
        </nav>
    )
}