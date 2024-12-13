const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new Todo
router.post('/todos', async (req, res) => {
    try {
        const { taskName } = req.body;
        const todo = new Todo({ taskName });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
});

// Get all Todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
});

// Update a Todo by ID
router.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { status:true},{ new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
});

// Delete a Todo by ID
router.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
});

module.exports = router;
