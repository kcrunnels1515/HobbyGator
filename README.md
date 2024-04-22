![Logo](https://github.com/aelawsons/HobbyGator/assets/93962200/43f1b9f6-0de8-44d9-bc6e-c5584b85f27b)
# HobbyGator
## A Forum-Based Hobby Website

Backend Documentation:
The user Class can be accessed through the route /user{} with the extension of the function that you want to access.
    1. For user login the bracket extension is /login where the method to the site is "POST.
        > This function requires the username and password to be passed in as a JSON file from the client.
            # the json file needs to be structured as a dictionary with key names "username" and "passwd".
        > Code 200 means that the username and password match, therefore signing in the user and having success.
        > Code 201 means that the user does exist, but the password does not match the provided username. 
        > Code 202 means that the user does not exist and client has provided an invalid username.

    2. For user sign up the bracket extension is /signup where the method to the site is "POST".
        > This function requires a new username, a new email, a password and a confirmation password that matches the password previously passed in. This data has to be as a JSON file. 
            # the json file needs to be structured as a dictionary with key names "email", "username", "passwd" and "confirmpasswd".
        > Code 200 means that the email and username are unused and valid, while the password and password confirmation are matching.
        > Code 201 means that the username is already being used for another account. 
        > Code 202 means that the passwords submitted do not match eachother.

    3. For deleting a user the bracket extension is /delete where the method to the site is "POST".
         > This function requires the username and password to be passed in as a JSON file from the client.
            # the json file needs to be structured as a dictionary with key names "username" and "passwd"
        > Code 200 means that the username and password match, therefore successfully deleting the user.
        > Code 201 means that the user does not exist and client has provided an invalid username.
        > Code 202 means that the user does exist, but the password does not match the provided username. 

The Forum class can be accessed through the route /forum{} with the extension of the function that you want to access.
    1. For Forum creation the bracket extension is /create where the method to the site is "POST.
        > This function requires the title, name, tags, info_block, and posts to be passed in as a JSON file from the client.
            # the json file needs to be structured as a dictionary with key names "title", "name", "tags", and "info_block".
        > Code 200 means that all the information was correctly passed in and the api has succesfully created the new Forum.
        > Code 201 means that client passed in no name which means that the Forum can't be created 
        > Code 202 means that the Forum name already exists and is not available for use in the new Forum.

    2. For deleting a Forum the bracket extension is /delete where the method to the site is "POST".
         > This function requires the name of the forum to be passed in as a JSON file from the client.
            # the json file needs to be structured as a dictionary with key name "name".
        > Code 200 means that the Forum exists, and it successfully deleted the forum.
        > Code 201 means that the user does not exist and client has provided an invalid name.

    3. For posting to a forum the bracket extension is /post where the method to the site is "POST".
        > This function requires a title, a username, the forum name where you want it posted and a post body. This data has to be as a JSON file. 
            # the json file needs to be structured as a dictionary with key names "title", "username", "forum_name" and "post_body".
        > Code 200 means that the email and username are unused and valid, while the password and password confirmation are matching.
        > Code 201 means that the post failed to be created. 
        > Code 202 means that the forum asked for does not exist.

    4. For retrieving a forum the bracket extension is /retrieve where the method to the site is "GET".
         > This function requires the name of the forum to be passed in as a JSON file from the client.
            # the json file needs to be structured as a dictionary with key name "forum_name".
        > Code 200 means that the Forum exists and it has been successfully retrieved.
        > Code 201 means that the user does not exist and client has provided an invalid name.

The Post class can be accessed through the route /post{} with the extension of the function that you want to access.
    1. For voting on a post the bracket extension is /vote where the method to the site is "POST".
        > This function requires the ID of the post you want to access. This data has to be as a JSON file. 
            # the json file needs to be structured as a dictionary with key name "_id".
        > Code 200 means that the id matches to a real post and the vote has been cast.
        > Code 201 means that the vote failed to be cast. 
        > Code 202 means that the id does not match an existing post in the system.

    2. For replying to a post the bracket extension is /reply where the method to the site is "POST".
         > This function requires the name of the parent post, the title of the response, username, the name of the forum and the response body to be passed in as a JSON file from the client.
            # the json file needs to be structured as a dictionary with key names "parent_post", "title", "username", "forum_name" and "post_body".
        > Code 200 means that the reply posted successfully next to the parent post. 
        > Code 201 means that the posting the reply was not successful.
        > Code 202 means that the new post creation failed and was not acknowledged.

