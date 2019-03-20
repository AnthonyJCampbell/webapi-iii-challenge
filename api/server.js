const express = require('express');
const morgan = require('morgan');

const server = express();
// Middleware
server.use(express.json());
server.use(morgan('short'));

// Routes
server.get('/', (req, res) => {
    res.send('success')
})


module.exports = server;