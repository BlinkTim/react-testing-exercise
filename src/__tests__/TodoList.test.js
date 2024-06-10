// src/__tests__/TodoList.test.js

import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import TodoList from '../components/TodoList';
import { addTodo } from '../functions/addTodo';

// Mocking the TodoItem component
jest.mock('../components/TodoItem', () => ({ todo }) => <li>{todo.text}</li>);

// Mocking the fetch function
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ text: 'Learn Jest' }]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetches and displays todos on mount', async () => {
  await act(async () => {
    render(<TodoList />);
  });

  // Check if the fetched todo is displayed
  expect(screen.getByText('Learn Jest')).toBeInTheDocument();
});

test('adds a new todo and displays it in the list', async () => {
  await act(async () => {
    render(<TodoList />);
  });

  const input = screen.getByPlaceholderText('Add a new todo');
  const button = screen.getByText('Add Todo');

  // Simulate user input
  await act(async () => {
    fireEvent.change(input, { target: { value: 'Learn TDD' } });
    fireEvent.click(button);
  });

  // Check if the new todo is displayed
  expect(screen.getByText('Learn TDD')).toBeInTheDocument();
});

test('does not display the new todo if the input is empty', async () => {
  await act(async () => {
    render(<TodoList />);
  });

  const button = screen.getByText('Add Todo');

  // Simulate clicking the button with empty input
  await act(async () => {
    fireEvent.click(button);
  });

  // Check if no empty todo is displayed
  const todos = screen.queryAllByRole('listitem');
  expect(todos).toHaveLength(1); // Only the fetched todo should be present
});

// Tests for the addTodo function
test('addTodo adds a new todo to the list', () => {
  const todos = [{ text: 'Learn React' }];
  const newTodo = { text: 'Learn TDD' };
  const updatedTodos = addTodo(todos, newTodo);
  expect(updatedTodos).toEqual([
    { text: 'Learn React' },
    { text: 'Learn TDD' }
  ]);
});

test('addTodo does not mutate the original list', () => {
  const todos = [{ text: 'Learn React' }];
  const newTodo = { text: 'Learn TDD' };
  const updatedTodos = addTodo(todos, newTodo);
  expect(todos).toEqual([{ text: 'Learn React' }]);
  expect(updatedTodos).not.toBe(todos);
});
