// ../functions/addTodo.js

export function addTodo(todos, newTodo) {
    // Die Funktion gibt ein neues Array zurück, das die alten Todos und das neue Todo enthält,
    // ohne das Original-Array zu mutieren.
    return [...todos, newTodo];
  }
  