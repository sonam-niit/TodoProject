import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import AddTodo from '../components/AddTodo';

const mock = new axiosMock(axios);

describe('AddTodo Component', () => {
    afterEach(() => {
        mock.reset();
    });

    test('adds a new todo', async () => {
        const mockTodo = { _id: '1', taskName: 'New Task', status: false };
        mock.onPost('http://localhost:5000/api/todos').reply(201, mockTodo);

        const addTodoMock = jest.fn();
        render(<AddTodo addTodo={addTodoMock} />);

        const input = screen.getByPlaceholderText('Add a new task');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(button);

        // Wait for the mock function to be called
        await waitFor(() => expect(addTodoMock).toHaveBeenCalledWith(mockTodo));

        // Verify the input field is cleared
        expect(input.value).toBe('');
    });
});
