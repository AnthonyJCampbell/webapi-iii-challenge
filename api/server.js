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
})

// GET By ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.getById(id)
  .then(data => {
    res.status(200).json(data);
  })
})
//getById()
// POST
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
})

// GET By ID
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  Posts.getById(id)
  .then(data => {
    res.status(200).json(data);
  })
})

// POST

// PUT

// DELETE



// Create a GET to retrieve all posts from user with :id
server.get('/api/users/:id/posts', (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
  .then(data => {
    res.status(200).json(data);
  })
}) 


//    /api/user/1


module.exports = server;