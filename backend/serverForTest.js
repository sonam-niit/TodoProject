const express = require('express');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', todoRoutes);

module.exports=app

