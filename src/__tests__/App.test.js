// src/__tests__/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

// Mocking the TodoList component
jest.mock('../components/TodoList', () => () => <div>Mocked TodoList</div>);

test('renders the App component correctly', () => {
  render(<App />);

  // Check if the header is rendered
  expect(screen.getByText('Todo App')).toBeInTheDocument();

  // Check if the TodoList component is rendered
  expect(screen.getByText('Mocked TodoList')).toBeInTheDocument();
});
