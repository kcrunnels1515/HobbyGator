import './Create.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RedirectBack() 
{
  const navigate = useNavigate();
  // Redirect to the create a post page:
  const redirectBack = () => {
    navigate('/forum');
  }
  
  // Button formatting:
  return (
    <h className='backButton'>
      <button onClick={redirectBack}>
        Back
      </button>
    </h>
  );
}


function CreateForum() {
// Initial setup for new forum: requires a title, name, tags, and info_block
const [title, setTitle] = useState('');
const [name, setName] = useState(null);
const [tag1, setTag1] = useState('');
const [tag2, setTag2] = useState('');
const [tag3, setTag3] = useState('');

const [infoBlock, setInfoBlock] = useState('');

    // Handle the submitting of the data:
    const handleSubmit = async (e) => {
        e.preventDefault();
        // These are how they are called in server.py
        const forum = { 
        "title": title, 
        "name": name,
        "categories": [tag1,tag2,tag3], 
        "info_block": infoBlock
        };

        // URL for creating a forum:
        const url = "/forum/create"

        // Wait for a response from the server for /post
        const options = {
        method: "POST",
        // Jsonify's the data so the db can understand
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(forum),
        }

        // Wait for response from fetch:
        const response = await fetch(url, options)

        // 200 means successful creation:
        // 201 = error, 202 = forum already exists
        if (response.status == 200) {
        const data = await response.json();
        alert(data.message); // Message from backend
        console.log("Forum created successfully!");
        // Optionally clear the form or redirect the user
        setTitle('');
        setName(null);
        setTag1('');
        setTag2('');
        setTag3('');
        setInfoBlock('');
        return data; /// THIS IS FOR DEBUGGING!!! (wanted to check if anything happens on correct)
        } 
        if(response.status == 202)
        {
        alert('Forum already exists, please search for it')
        }
        else {
        console.error('Failed to create forum'); // BOO!!!
        alert('Error creating forum');
        }
    }

    return (
    <div className='center'>
    <div className='container'>
        <div className='topLeft'>
            <RedirectBack/>
        </div>
        <h1>Create a New Forum</h1>
        <form onSubmit={handleSubmit}>
        <input className='input'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Set forum name..."
            required
        />  
        {/* LEFT OUT ADDING USERNAME AS IT SEEMS UNECESSARY WHEN CREATING A NEW FORUM
            Instead: user add forum to their account when they search it.*/}
        {/* <input className='input'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder= ""
            required
        /> */}
        <div className='tags'>
          <input className='input'
              type="text"
              value={tag1}
              onChange={(e) => setTag1(e.target.value)}
              placeholder="Tag 1..."
              required
          />
          <input className='input'
              type="text"
              value={tag2}
              onChange={(e) => setTag2(e.target.value)}
              placeholder="Tag 2..."
              required
          />
          <input className='input'
              type="text"
              value={tag3}
              onChange={(e) => setTag3(e.target.value)}
              placeholder="Tag 3..."
              required
          />
        </div>
        <textarea className='input'
            type="text"
            value={infoBlock}
            onChange={(e) => setInfoBlock(e.target.value)}
            placeholder="What is this forum about?"
            required
        />

        <button type="submit">Create Forum</button>
        </form>
    </div>
    </div>
  );
}

export default CreateForum;

