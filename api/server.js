const express = require('express');
const morgan = require('morgan');

const server = express();

const Users = require('./../data/helpers/userDb');
const Posts = require('./../data/helpers/postDb');

// Middleware
server.use(express.json());
server.use(morgan('short'));
server.use(capitalize)

//Takes name and capitalizes it in POST and PUT Requests"
function capitalize(req, res, next) {
  const name = req.body.name;
  holder = { name: name.toUpperCase() };
  req.name = holder;
  next(); 
}

//// Routes

// USERS

// GET
server.get('/api/users', (req, res) => {
  Users.get()  
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ error: "The user could not be retrieved." })
  });
})

// GET By ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.getById(id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ error: "The user's information could not be retrieved." })
  });
})

// POST
server.post('/api/users', capitalize, (req, res) => {
  const { name } = req.name;
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
          error: "There was an error while saving the user to the database"
        })
      })
  }
})

// PUT
server.put('/api/users/:id', capitalize, (req, res) => {
  const id = req.params.id;
  const name = req.name;
  console.log(req.body)
  if (!name) {
    res.status(400).json({ 
      errorMessage: "Please provide new name for your users." 
    })
  } else {
    Users.update(id, name)
      .then(data => {
        if(data) {
          res.status(202).json({...name, id});
        } else {
          res.status(404).json({ 
            message: "The user with the specified ID does not exist." 
          })
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." })
      })
  }
})


// DELETE
server.delete("/:id", async (req, res) => {
  // need to delete the posts
  const posts = await Users.getUserPosts(req.params.id)
  await posts.forEach( async (post) => {
    await Posts.remove(post.id)
  });
  User.remove(req.params.id)
  .then( data => {
    if(!data){
      res.status(404).json({message: "That user does not exist"})
    }else {
      res.status(202).json({message: "User was deleted", id: req.params.id})
    }
  })
  .catch( err => {
    res.status(500).json({message: "server error", error: err})
  })
})


// POSTS

// GET
server.get('/api/posts', (req, res) => {
  Posts.get()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ error: "The posts info could not be retrieved." })
  });
})

// GET By ID
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  Posts.getById(id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({ error: "The post could not be retrieved." })
  });
})

// POST
server.post('/api/posts', (req, res) => {
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({ 
      errorMessage: "Please provide the text of the new post and to whom it belongs! HINT: Check what the user_id is of to whom it belongs"
    })
  } else {
    Posts.insert(req.body)
      .then(data => {
        res.status(201).json({ ...data, text, user_id });
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      })
  }
})

// PUT
server.put('/api/posts/:id', (req, res) => {
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({ 
      message: "A text and user_id is required" 
    })
  } else {
    Posts.update(req.params.id, req.body)
      .then(data => {
          res.status(200).json({...req.body, id: req.params.id});
      })
      .catch(err => {
        res.status(500).json({ message: "Server error", error: err })
      })
  }
})

// DELETE
server.delete('/api/posts/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(data => {
    if(!data){
      res.status(404).json({message: "That Post does not exist"})
    }else {
      res.status(202).json({message: "Post was deleted", id: req.params.id})
    }})
    .catch( err => {
      res.status(500).json({message: "server error", error: err})
    })
})


// Create a GET to retrieve all posts from user with :id
server.get('/api/users/:id/posts', (req, res) => {
  const { id } = req.params;
  // Check if user with id exists.
  Users.getUserPosts(id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(404).json({ 
      message: "The user with the specified ID does not exist." 
    })
  })
}) 

module.exports = server;