import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from '../components/AddTodo'

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    // Fetch todos from the backend
    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Update the status of a todo
    const updateStatus = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`);
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, status: response.data.status } : todo
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Add a new todo
    const addTodo = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <AddTodo addTodo={addTodo} />
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <span
                            style={{
                                textDecoration: todo.status ? 'line-through' : 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => updateStatus(todo._id)}
                        >
                            {todo.taskName}
                        </span>
                        <button
                            data-testid={`delete-${todo._id}`}
                            onClick={() => deleteTodo(todo._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
