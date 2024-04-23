import React, {useState} from 'react'


function useUsername () {
    const getUsername =() =>{
        const usernameString = sessionStorage.getItem('username')
        const userUsername = JSON.parse(usernameString)
        return userUsername?.username
    }

    const [username, setUsername] = useState(getUsername())
    const saveUsername = userUsername => {
        sessionStorage.setItem('username', JSON.stringify(userUsername))
        setUsername(userUsername.username)
      }
      return {
        setUsername: saveUsername,
        username
      }
 }

export { useUsername }
