import { useState, useEffect } from "react";
import UserList from "./UserList";
import "./App.css";
import UserForm from "./UserForm";

function App() {
  // creates the needed variables and functions for the app to run
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  // this is what helps me get a list of users from the backend
  useEffect(() => {
    fetchUsers()
  }, []);

  // fetches the backend data and then jsonifies it to be able to use it in my code
  const fetchUsers = async () => {
    const response = await fetch("http://127.0.0.1:5000/users");
    const data = await response.json();
    setUsers(data.users);
  };

  // closes the extra window set up for adding/updating a user by setting the bool to false
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentUser({})
  }

  // opens extra window for adding and updating users by setting bool to true
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  // this makes the update button open the window as update but only if its closed rn
  const openEditModal = (user) => {
    if (isModalOpen) return
    setCurrentUser(user)
    setIsModalOpen(true)
  }

  // if we hit the update button it closes the window and gets the new list of users from backend
  const onUpdate = () => {
    closeModal()
    fetchUsers()
  }

  return (
    // first line prints each user from the list defining what to do if update button is pressed
    // then we have a create user button that just opens window as a create rather than update
    // then we define our window to have the parameters we want to input
    <>
      <UserList users={users} updateUser={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New User</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <UserForm existingUser={currentUser} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

export default App;