## Welcome to Paintify


### Project Description 
This project would be a shared canvas for individuals to create whatever they wish, where each user will be able to create shapes, lines, free draw, pan around the canvas, or scale/stretch their drawings out. The user will have the ability to save their paintings to access and edit whenever they wish. They will also have access to other user's drawings and will be able to add to collaborate on them while the original creator maintains ownership.

### Project Design 
  -**Technologies** 
    This project will consist of a Node.JS server maintained to server to the database. A "user" will be defined as someone with a given Auth0, JWT signed access_token and will exist within the database with their associated paintings. This project will be a WebApp built using ReactJS, styled with Bootstrap v4 and hosted on a Heroku Server. This project will need to keep track of numerous potential states of an existing or newly created document as well as users logged on and users attempting to access the same document.
    
  -**Use Cases**
    -A user will be able to create on a blank canvas
    -A user will be able to collaborate with other users across the world on countless different paintings
    -A user will be able to save their paintings for future use
    -A user will be able to edit other user's paintings
    -A users identity will be secured on the server, but their name will be publicly attached to their specific works of art or any edits they make to another user's paintings
    
### Project Schedule 
  - **Checkpoint 1 (3/20):** The first checkpoint will contain the initial structure of the Node.JS as well as the homepage for the site with instructions for the user built in ReactJS
  - **Checkpoint 2 (3/27):** The second checkpoint will require the main use case of the site consisting of the blank canvas to be displayed on the site. 
  - **Checkpoint 3 (4/04):** The third checkpoint will be set aside to implement the user functionality of actually drawing on the canvas and saving the results given the user's unique access_token. Saving the data will require the authentication service to be setup as well.
  - **Final 7 (5/01):** Finalization and testing
  
### Project Justification 
  - This project is compelling because of its crowdsourcing/colloborative nature in whch user's can work together or against each other. This project has not been widely implemented for a long period of time. This project is complex as React deals with keeping track of countless states while mainting authentication across all users. The node.js service will be fairly complicated to use in conjunction with the asynchronus get/post functions of axios as asynchronous states can lead a developer down a rabbit hole. 

