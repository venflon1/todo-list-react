import React from 'react';
import './AddTodo.css';

const ENTER_CODE = 13;

const cleanInput = (input) => {
  input.value = '';
}

const addTodo = (props) => {
  console.log("addTodo - render - props=", props);

  let todoInput;
  return (
    <div className="addTodo">
      <input
        ref={ (node) => todoInput = node }
        placeholder="insert todo..."
        onKeyUp ={ (event) =>{
          if(event.keyCode === ENTER_CODE){
            props.addTodoHandler( todoInput.value);
            props.onFilterClickHandler('All')
            cleanInput(todoInput); }
          }
        }
      />
      <button
        onClick={ () => {
          props.addTodoHandler( todoInput.value );
          props.onFilterClickHandler('All')
          cleanInput(todoInput); }
        }
      >
          ADD
      </button>
    </div>
  );
}

export default addTodo;