import React from 'react';
import Todo from './Todo/Todo';
import './TodoList.css';
import { isNullOrUndef, isArrayNotEmpty } from '../../utils/functionUtils';

const todoList = (props) => {
  const todos = props.todos;
  console.log("TodoList - render - props=", props);

  if(props.error.occured){
    throw new Error(props.error.message);
  }

  let todoListItems = null;
  if( !isNullOrUndef(todos) && isArrayNotEmpty(todos) ){
    console.log("TodoList - render - if statment");
    todoListItems =  todos.map( (todo) => {
      console.log('todo=', todo);
      return (
        <li
          key={todo.id}
          className={todo.completed? 'completed': ''}>
          <Todo
              className="todoItem"
              todo={todo}
              handleTodoComplete={props.handleTodoCompleted}
              deleteTodo={props.deleteTodo}
          />
        </li>
        );
    });
  }

  return (
    <div className="list-todo">
        <ul>
          {todoListItems}
        </ul>
    </div>
  );
}

export default todoList;