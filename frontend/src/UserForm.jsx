import { useState } from "react";

const UserForm = ({ existingUser = {}, updateCallback }) => {
    // this defines every single parameter for the user that we need to send back to the backend
    // each line creates a variable and function depending on what is passed in
    const [userName, setUserName] = useState(existingUser.userName || "");
    const [email, setEmail] = useState(existingUser.email || "");
    const [password, setPassword] = useState(existingUser.password || "");
    const [confirmPassword, setConfirmPassword] = useState(existingUser.confirmPassword || "");
    // this makes a bool to see if we're updating the user or making one
    const updating = Object.entries(existingUser).length !== 0

    // general onSubmit that plays when submit pressed
    const onSubmit = async (e) => {
        // stops page from refreshing
        e.preventDefault()
        // creates a data list that we will need to pass to the backend
        const data = {
            userName,
            email,
            password,
            confirmPassword
        }
        // this defines our URL so that we correctly access the backend with the right user and are able to change it
        const url = "http://127.0.0.1:5000/" + (updating ? `update_user/${existinguser.id}` : "create_user")

        // tells the website what method we plan to use and jsonifies the data so that backend can read it
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        // waits for the fetch command to finish running and saves the data in response
        const response = await fetch(url, options)

        // depending on if this was successful we get a status back
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        // this just sets the page to have what we need in the form to have a full submission
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="userName">User Name:</label> 
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="text"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default UserForm