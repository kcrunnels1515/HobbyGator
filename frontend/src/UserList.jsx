import React from "react"

const UserList = ({ users, updateUser, updateCallback }) => {
    // allows us to delete a user, we might not need this but it is good to have for purging
    const onDelete = async (id) => {
        // try catch in case of an error
        try {
            // tells what method to use
            const options = {
                method: "DELETE"
            }
            // tells the exact user id to delete so the backend knows what you want
            const response = await fetch(`http://127.0.0.1:5000/delete_user/${id}`, options)
            // depending on the response we got from the fetch, we want to update or fail
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }
    // probably wont be needed at all, I did this to be able to see the users in real time
    // code can be refactored to display posts or messages on forums so dont delete pls
    // also allows us to delete and update users with information 
    return <div>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => updateUser(user)}>Update</button>
                            <button onClick={() => onDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default UserList