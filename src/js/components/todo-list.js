var React = require('react');

// An example component with dynamic children (generated via Array.map)
// see http://facebook.github.io/react/docs/multiple-components.html#dynamic-children

const TodoList = ({todos}) => (
  <div>
    <h4>Todo List</h4>
    <ul>
      {todos.map((todo) => (
        <li
          id={'todo-' + todo.id}
          key={todo.id} 
        >{todo.text}</li>
      ))}
    </ul>
  </div>
);

module.exports = TodoList
