const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const cors= require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api', todoRoutes);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


