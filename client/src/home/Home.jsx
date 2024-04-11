//homepage thats an about us page
import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <h1 className='tagline'>Welcome to HobbyGator!</h1>
        <h2 className='tagline2'>Share your hobbies and interests with the world.</h2>
      {/* Main Content */}
      <main>
        <h1 className='aboutUs'>About Us</h1>
        <p className='aboutUsText'>HobbyGator is a platform for hobbyists and enthusiasts to share their hobbies and interests with the world. Whether you're into painting, cooking, or hiking, HobbyGator is the place to connect with like-minded individuals and discover new hobbies. Join our community today and start sharing your passions!</p>
      </main>
    </div>
  );
}

export default Home;
