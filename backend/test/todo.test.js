const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../serverForTest'); // Import your app
const Todo = require('../models/todo'); // Import the model

// Connect to a test database
beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/todoapp-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Clear the test database before each test
beforeEach(async () => {
    await Todo.deleteMany({});
});

// Disconnect from the test database after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Todo API Tests', () => {
    test('POST /api/todos - Should create a new todo with default status as false', async () => {
        const newTodo = { taskName: 'Learn Testing' };

        const response = await request(app)
            .post('/api/todos')
            .send(newTodo)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.taskName).toBe(newTodo.taskName);
        expect(response.body.status).toBe(false); // Default value
    });

    test('GET /api/todos - Should return all todos', async () => {
        const todo1 = new Todo({ taskName: 'Task 1' });
        const todo2 = new Todo({ taskName: 'Task 2', status: true });
        await todo1.save();
        await todo2.save();

        const response = await request(app)
            .get('/api/todos')
            .expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0].taskName).toBe(todo1.taskName);
        expect(response.body[1].taskName).toBe(todo2.taskName);
        expect(response.body[1].status).toBe(true);
    });

    test('PUT /api/todos/:id - Should update only the status from false to true', async () => {
        // Step 1: Create a Todo with default status false
        const todo = new Todo({ taskName: 'Initial Task' });
        await todo.save();
    
        // Step 2: Update the status to true
        const updatedStatus = { status: true };
    
        const response = await request(app)
            .put(`/api/todos/${todo._id}`)
            .send(updatedStatus)
            .expect(200);
    
        // Step 3: Verify the response
        expect(response.body._id).toBe(todo._id.toString());
        expect(response.body.taskName).toBe(todo.taskName); // Task name should remain unchanged
        expect(response.body.status).toBe(true); // Status updated to true
    
        // Step 4: Verify in the database
        const updatedTodo = await Todo.findById(todo._id);
        expect(updatedTodo.status).toBe(true); // Status should be true
    });
    

    test('DELETE /api/todos/:id - Should delete a todo', async () => {
        const todo = new Todo({ taskName: 'Task to delete' });
        await todo.save();

        const response = await request(app)
            .delete(`/api/todos/${todo._id}`)
            .expect(200);

        expect(response.body.message).toBe('Todo deleted successfully');

        const deletedTodo = await Todo.findById(todo._id);
        expect(deletedTodo).toBeNull();
    });

    test('POST /api/todos - Should not create a todo without taskName', async () => {
        const response = await request(app)
            .post('/api/todos')
            .send({})
            .expect(500); // Validation error

        expect(response.body.message).toBe('Error creating todo');
    });
});
