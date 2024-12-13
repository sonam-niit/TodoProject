import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = ({ addTodo }) => {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskName) return;

        try {
            const response = await axios.post('http://localhost:5000/api/todos', { taskName });
            addTodo(response.data);
            setTaskName('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodo;
