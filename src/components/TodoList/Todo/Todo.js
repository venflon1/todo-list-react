import React from 'react'
import './Todo.css';

const Todo = (props) => {
  const todo = props.todo;
  console.log("Todo - render - props=", props);

  return(
    <React.Fragment>
      <div className="todo-item">
        <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) => props.handleTodoComplete(todo.id, !todo.completed)}
          />
          <label>{todo.title}</label>
      </div>
      <div className="todoItem-deleteButton">
        <button onClick={props.deleteTodo.bind(this, todo.id)}></button>
      </div>
    </React.Fragment>
  )
}

export default Todo;