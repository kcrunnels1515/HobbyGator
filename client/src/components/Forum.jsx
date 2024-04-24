import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useResolvedPath } from 'react-router-dom';
import './Forum.css';
import CreatePost from '../pages/create/Create';
import ReactMarkdown from 'react-markdown'

// The end goal for now for this page is to just post and have the forum type/category at the top.
// Future goal: make it so each forum type has it's own forum home that holds the posts.
// At that point, this page would just hold links to those pages (updates as forums are created)

// Fix this to redirect back to the specific forum page and not just the forum home!
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

// Define a simple Post component to display individual posts
function Post({ title, content, username, votes }) {
  return (
    <>
    <div className="post">
      <h3>{title}</h3>
      <ReactMarkdown>{content}</ReactMarkdown>
      <small>Posted by {username}</small>
      <br/>
      <small>Votes: {votes}</small>
      </div>
    <div className="replies"/>
    </>
  );
}

function Upvote({})
{
  
}

const Forum = () => {
  const { forum_name } = useParams();
  const [posts, setPosts] = useState([]); // State to store the posts
  const [forumtitle, setForumTitle] = useState('');
  const [forumtags, setForumTags] = useState([]);
  const [foruminfo, setForumInfo] = useState('');
  const [votes, setVotes] = useState(''); // To store each post's vote count

  // What even is this....
    useEffect(() => {
	async function fetchData(forumname){
	    
    // Ensure the URL is correct and points to your Flask backend
    const url = '/forum/retrieve'; // Update this URL based on your actual Flask setup
    const data = {
          "forum_name": forumname
    }
    debugger;
    const options = {
          method: "POST",//updating ? "PATCH" : "POST",
          headers: {
              "Content-Type": "application/json"
          },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    
      // depending on if this was successful we get a status back
      if (response.status !== 201 && response.status !== 200) {
          const data = await response.json()
        alert(data.message)
      }
      if(response.status === 200)
      {
        const data = await response.json()
        // Optionally clear the formL
        setPosts(data.posts); // Set the fetched posts into state
        setForumTitle(data.title);
        setForumTags(data.tags);
        setForumInfo(data.info_block);
        setVotes(data.votes)
      }
	}
	fetchData(forum_name);
    }, [setPosts,setForumTitle,setForumTags,setForumInfo, setVotes, forum_name]);
  // }, []); // Empty dependency array to run only once on mount
  
  return (
    <div>
      <h1 className='left'>
      <RedirectBack/>
        </h1>
      {/* <button onClick={CreatePost(forum_name)}>
          Create Post
      </button> */}

      <div className='forumTitle'>
      <h2>{forumtitle}</h2>
	  {/*<p>{forumtags.map(tag => tag + ", ")}</p> i think tags should be an internal value, having them display is kinda ugly */}
      <p>{foruminfo}</p>
      </div>
        <main>
        {/* List out the links for different forums here by retrieving forum names and setting links to the sub-attribute of the routing */}
        {posts.map(post => <Post
          title={post.title}
          content={post.post_body}
          username={post.username}
          votes={post.votes}
          />)}
        {/* Create button that will increase the post votes + reply to post: */}
        

      </main>
      <p className= 'create'>
      <CreatePost forumName = {forum_name} />
      </p> 
    </div>
  );
};

export default Forum;
