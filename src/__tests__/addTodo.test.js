import { addTodo } from '../functions/addTodo';
test('adds a new todo to the list', () => {
  const todos = [{ text: 'Learn React' }];
  const newTodo = { text: 'Learn TDD' };
  const updatedTodos = addTodo(todos, newTodo);
  expect(updatedTodos).toEqual([
    { text: 'Learn React' },
    { text: 'Learn TDD' }
  ]);
});//
test('does not mutate the original list', () => {
  const todos = [{ text: 'Learn React' }];
  const newTodo = { text: 'Learn TDD' };
  const updatedTodos = addTodo(todos, newTodo);
  expect(todos).toEqual([{ text: 'Learn React' }]);
  expect(updatedTodos).not.toBe(todos);
});