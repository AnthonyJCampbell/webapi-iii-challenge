const express = require('express');
const morgan = require('morgan');

const server = express();

const Users = require('./../data/helpers/userDb');
const Posts = require('./../data/helpers/postDb');

// Middleware
server.use(express.json());
server.use(morgan('short'));
// WRITE CUSTOM MIDDLEWARE TO UPPERCASE USER'S NAME BEFORE A REQUEST REACHES POST OR PUT HANDLERS

//// Routes

// USERS

// GET
server.get('/api/users', (req, res) => {
  Users.get()  
  .then(data => {
    res.status(200).json(data);
  })
  // ADD .catch
})

// GET By ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.getById(id)
  .then(data => {
    res.status(200).json(data);
  })
  // ADD .catch
})

// POST
server.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ 
      errorMessage: "Please provide the name of the new user!"
    })
  } else {
    Users.insert(req.body)
      .then(data => {
        res.status(201).json({ ...data, name });
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      })
  }
})
//insert()
// PUT
//update()
// DELETE
//remove()


// POSTS

// GET
server.get('/api/posts', (req, res) => {
  Posts.get()
  .then(data => {
    res.status(200).json(data);
  })
  // ADD .catch
})

// GET By ID
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  Posts.getById(id)
  .then(data => {
    res.status(200).json(data);
  })
  // ADD .catch
})

// POST

// PUT

// DELETE



// Create a GET to retrieve all posts from user with :id
server.get('/api/users/:id/posts', (req, res) => {
  const { id } = req.params;
  // Check if user with id exists.
  Users.getUserPosts(id)
  .then(data => {
    res.status(200).json(data);
  })
  // ADD .catch
}) 

module.exports = server;