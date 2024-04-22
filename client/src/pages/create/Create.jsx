import './Create.css';
import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';


function CreatePost({forumName}) {
  // Initial setup for the post: requires a title, username, forumname, and postbody
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [postBody, setPostBody] = useState('');

  // Handle the submitting of the data:
  const handleSubmit = async (e) => {
    e.preventDefault();
    // These are how they are called in server.py
    const post = { 
      "title": title, 
      "username": username, 
      "forum_name": forumName, 
      "post_body": postBody
    };

    // URL for posting:
    const url = "/forum/post"

    // Wait for a response from the server for /post
    const options = {
      method: "POST",
      // Jsonify's the data so the db can understand
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }

    // Wait for response from fetch:
    const response = await fetch(url, options)

    // 200 means successful posting: (keeping it like this for now teehe)
    // 201 = the post didn't insert correctly, code 202 is the forum doesn't exist!
    if (response.status == 200) {
      const data = await response.json();
      alert('Posted'); // Message from backend
      console.log("Post created successfully!");
      // Optionally clear the form or redirect the user
      setTitle('');
      setUsername('');
      setPostBody('');

      window.location.reload();
    
      //return data; /// THIS IS FOR DEBUGGING!!! (wanted to check if anything happens on correct)
    } 
    if(response.status == 202)
    {
      alert('Forum does not exist, please create it first')
    }
    else {
      console.error('Failed to create post'); // BOO!!!
    }
  };

  return (
    <div className='center'>
      <div className='container'>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <input className='input'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
            required
          />  
          <input className='input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User..."
            required
          />
          <textarea className='input'
            type="text"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            placeholder="Type post here..."
            required
          />

          <button type="submit">Submit Post</button>
        </form>
      </div>
    </div>
  );
}
export default CreatePost;
