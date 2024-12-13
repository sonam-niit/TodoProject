import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import TodoList from '../components/TodoList';

const mock = new axiosMock(axios);

describe('TodoList Component', () => {
    afterEach(() => {
        mock.reset();
    });

    test('renders fetched todos', async () => {
        const mockTodos = [
            { _id: '1', taskName: 'Test Task 1', status: false },
            { _id: '2', taskName: 'Test Task 2', status: true },
        ];
        mock.onGet('http://localhost:5000/api/todos').reply(200, mockTodos);

        render(<TodoList />);

        const task1 = await screen.findByText('Test Task 1');
        const task2 = await screen.findByText('Test Task 2');

        expect(task1).toBeInTheDocument();
        expect(task2).toBeInTheDocument();
    });

    test('updates status on click', async () => {
        // Mock initial todos and the PUT response
        const mockTodo = { _id: '1', taskName: 'Test Task 1', status: false };
        const updatedTodo = { ...mockTodo, status: true };

        mock.onGet('http://localhost:5000/api/todos').reply(200, [mockTodo]);
        mock.onPut(`http://localhost:5000/api/todos/1`).reply(200, updatedTodo);

        render(<TodoList />);

        // Wait for the initial todos to render
        const task = await screen.findByText('Test Task 1');

        // Simulate clicking on the task to update its status
        fireEvent.click(task);

        // Wait for the status to update and assert the new style
        await waitFor(() => expect(task).toHaveStyle('text-decoration: line-through'));
    });
    test('deletes a todo on click of the delete button', async () => {
        // Mock initial todos and delete response
        const mockTodos = [
            { _id: '1', taskName: 'Test Task 1', status: false },
            { _id: '2', taskName: 'Test Task 2', status: false },
        ];

        mock.onGet('http://localhost:5000/api/todos').reply(200, mockTodos);
        mock.onDelete('http://localhost:5000/api/todos/1').reply(200);

        render(<TodoList />);

        // Wait for the todos to render
        const task = await screen.findByText('Test Task 1');
        const deleteButton = screen.getByTestId('delete-1'); // Assuming the delete button has `data-testid="delete-<id>"`

        // Simulate clicking the delete button
        fireEvent.click(deleteButton);

        // Wait for the todo to be removed from the DOM
        await waitFor(() => expect(task).not.toBeInTheDocument());

        // Ensure the remaining todos are still in the DOM
        const remainingTask = screen.getByText('Test Task 2');
        expect(remainingTask).toBeInTheDocument();
    });
});
