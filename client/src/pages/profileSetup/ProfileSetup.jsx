// import React, { useState } from 'react';
// import './ProfileSetup.css'; 

// const ProfileSetup = ({ onProfileComplete }) => {
//   const [name, setName] = useState('');
//   const [bio, setBio] = useState('');
//   const [hobbies, setHobbies] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Assume you have an API endpoint to update the user's profile
//     fetch('/user/profile', {
//       method: 'POST',
//       body: JSON.stringify({ name, bio, hobbies }),
//       headers: {
//         'Content-Type': 'application/json',
//         // Include authorization token if required
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Profile updated:', data);
//         // Callback to indicate profile completion
//         onProfileComplete();
//       })
//       .catch((error) => {
//         console.error('Error updating profile:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Set Up Your Profile</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

//         <label>Bio:</label>
//         <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

//         <label>Hobbies:</label>
//         <input type="text" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />

//         <button type="submit">Complete Profile</button>
//       </form>
//     </div>
//   );

// };


// export default ProfileSetup;
