import React, {useState} from 'react'


function useForums () {
    const getForums =() =>{
        const forumsList = sessionStorage.getItem('forums')
        const userForums = JSON.parse(forumsList)
        return userForums?.forums
    }

    const [forums, setForums] = useState(getForums())
    const saveForums = userForums => {
        sessionStorage.setItem('forums', JSON.stringify(userForums))
        setForums(userForums.forums)
      }
      return {
        setForums: saveForums,
        forums
      }
 }

export { useForums }
