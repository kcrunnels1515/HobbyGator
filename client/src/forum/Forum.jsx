import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Forum.css';
import Navbar from '../components/Navbar';

// Define a simple Post component to display individual posts
function Post({ title, content, date, username }) {
  return (
    <div className="post">
      <h3>{title}</h3>
      <div>{content}</div>
      <footer>
        <small>Posted by {username} on {date}</small>
      </footer>
    </div>
  );
}

const Forum = () => {
  const { type } = useParams();
  const [posts, setPosts] = useState([]); // State to store the posts

  useEffect(() => {
    // Ensure the URL is correct and points to your Flask backend
    const url = '/forum/retrieve'; // Update this URL based on your actual Flask setup
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        setPosts(data); // Set the fetched posts into state
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []); // Empty dependency array to run only once on mount

  return (
    <div>
      <h1 className='tagline'>Welcome to HobbyGator!</h1>
      <h2 className='tagline2'>Share your hobbies and interests with the world.</h2>
      <main>

      </main>
    </div>
  );
};

export default Forum;
