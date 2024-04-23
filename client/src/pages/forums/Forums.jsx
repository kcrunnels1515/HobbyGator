import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Forums.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// The end goal for now for this page is to just post and have the forum type/category at the top.
// Future goal: make it so each forum type has it's own forum home that holds the posts.
// At that point, this page would just hold links to those pages (updates as forums are created)

// Button to redirect to the post page: (rather than having everything on the navbar lol)
// function CreateRedirect() 
// {
//   const navigate = useNavigate();
//   // Redirect to the create a post page:
//   const redirectCreatePost = () => {
//     navigate('/forum/post');
//   }
  
//   // Button formatting:
//   return (
//     <h className='postButton'>
//       <button onClick={redirectCreatePost}>
//         Post to Forum
//       </button>
//     </h>
//   );
// }

// Redirect to the Create form page:
function CreateForumRedirect() 
{
  const navigate = useNavigate();

  const redirectCreateForum = () => {
    navigate('/forum/newforum');
  }
  
  // Button formatting:
  return (
    <h className='postButton'>
      <button onClick={redirectCreateForum}>
        Create new Forum
      </button>
    </h>
  );
}



// Pick a forum to look at the posts from (have the user search a name for now, change later?)
function FindForum()
{
  // Essentially same set up as create post, but retrieval!
  const [forumName, setForumName] = useState(''); // to store the searchable forumName 
  const navigate = useNavigate();


  const handleForumSearch = async (e) => {
    e.preventDefault();
    const forumSearch = { 
      "forum_name": forumName, 
    };

    // Redirect to the create a post page: (IF FOUND)
    const redirectForum = () => {
      navigate('/forum/' + forumName);
    }

    // Retrieve returns the forum's posts!
    const url = "/forum/retrieve"

    // Get method to retrieve specific forumName!
    const options = {
        method: "POST",
        // Jsonifies the data so the db can understand
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forumSearch),
    }
    
    const response = await fetch(url, options);

    // 200 means successful posting: (keeping it like this for now teehe)
    // code 201 is the forum doesn't exist!
    if (response.status == 200) {
      const data = await response.json();
      //alert('found');
      redirectForum();

      // Optionally clear the form or redirect the user
      setForumName('');
      return data; /// THIS IS FOR DEBUGGING!!! (wanted to check if anything happens on correct)
    
    } else {
      alert('Forum not found, create it!'); // BOO!!!
    }
  }

  return (
    <form onSubmit ={handleForumSearch}>
      <input  
        type="text"
        value={forumName}
        onChange={(e) => setForumName(e.target.value)}
        placeholder="Search for Forum..."
        required
      /> 

      <button type="search">Search</button>
    </form>
  )
}

const Forums = () => {
  return (
    <div>
      <h1 cassname = 'form'>
      <h3 className='block'>
      <h>
        Search for a hobby forum:
      </h>
      <h>
        <FindForum/>
        {/* <h className='redirects'> 
          <CreateRedirect/>      
        </h> */}
        <h className='redirects'>       
          <CreateForumRedirect/>
        </h>
      </h>
      </h3>
      </h1>
    </div>
  );
};

export default Forums;
