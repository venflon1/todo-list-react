/**
 * I Reducers sono funzioni che:
 * -> ricevono in input 2 cose:  -> lo stato (o parte di esso) dell'app,    -> un'azione
 * -> ritornano il nuovo stato dell'app
 *
 * (Vengono chiamati Reducer, perchè da 2 oggetti che entrano in input: stato e azione, lo riducono in uno solo: il nuovo stato)
 */
import {  ADD_TODO_FULFILLED, ADD_TODO_REJECTED, DELETE_TODO_FULFILLED, DELETE_TODO_REJECTED,
          HANDLE_COMPLETED_TODO_FULFILLED, HANDLE_COMPLETED_TODO_REJECTED,
          LOAD_DATA_FROM_SERVER_FULFILLED, LOAD_DATA_FROM_SERVER_REJECTED  } from '../actionTypes/todosActionTypes';
import { isArrayNotEmpty, isNullOrUndef, iSNullOrUndefOrVoidStr } from '../utils/functionUtils';

/**
 *  Todos Reducer
 *  Input : state  - lo stato iniziale
 *  Input : action - l'azione
 *
 *  Output : il nuovo stato
 */
const todosReducer = (state = [], action) =>{
  console.log("todosReducer - START - stateForTodos=", state, " - action=", action);

  switch(action.type){
    case ADD_TODO_FULFILLED: {
      console.log("todosReducer - case switch - action.type=", action.type);
      let newTodos = [...state];
      let todoToAdd = null;
      if( !isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && (action.payload.status === 200 || action.payload.status === 201) && !isNullOrUndef(action.payload.data)){
        todoToAdd = action.payload.data;
        if( !isNullOrUndef(todoToAdd) && !isNullOrUndef(todoToAdd.id) && !(iSNullOrUndefOrVoidStr(todoToAdd.title)) && !(isNullOrUndef(todoToAdd.completed))){
          newTodos.push(todoToAdd);
        }
      }
      console.log("todosReducer - case switch - action.type=", action.type, " - return todos=", newTodos);
      return newTodos;
    }

    case ADD_TODO_REJECTED: {
      console.log("todosReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);

      return ;
    }

    case DELETE_TODO_FULFILLED: {
      console.log("todosReducer - case switch - action.type=", action.type);
      const copyState = [...state];
      let newTodos = null;
      if( !isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && action.payload.status === 200 && !isNullOrUndef(action.payload.config.idTodoDeleted)){
        const idTodoToDelete = action.payload.config.idTodoDeleted;
        console.log("todosReducer - case switch - action.type=", action.type," - idTodoToDelete=", idTodoToDelete );
        newTodos = copyState.filter( (todo) => todo.id !== idTodoToDelete );
      }
      console.log("todosReducer - case switch - action.type=", action.type, " - return todos=", newTodos);
      return newTodos;
    }

    case DELETE_TODO_REJECTED: {
      console.log("todosReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);

      return ;
    }

    case HANDLE_COMPLETED_TODO_FULFILLED: {
      console.log("todosReducer - case switch - action.type=", action.type);
      let newTodos = [...state];
      if( !isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && action.payload.status === 200 && !isNullOrUndef(action.payload.config.idTodoUpdated)){
        const idTodoUpdated = action.payload.config.idTodoUpdated;
        if( !isNullOrUndef(newTodos) && isArrayNotEmpty(newTodos) ){
          newTodos.forEach( (todo) => {
            if(todo.id === idTodoUpdated){
              // aggiorno con dato ritornato dal server
              todo.completed = action.payload.data.completed;
            }
          });
        }
      }
      console.log("todosReducer - case switch - action.type=", action.type, " - return todos=", newTodos);
      return newTodos;
    }

    case HANDLE_COMPLETED_TODO_REJECTED: {
      console.log("todosReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);

      return ;
    }

    case LOAD_DATA_FROM_SERVER_FULFILLED: {
      console.log("todosReducer - case switch - action.type=", action.type, "payload=", action.payload);
      let todosFromServer = null;
      if(!isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && action.payload.status === 200 && !isNullOrUndef(action.payload.data)){
        todosFromServer = action.payload.data;
        console.log("todosReducer - case switch - action.type=", action.type, "dataFromServer=", todosFromServer);

      }
      console.log("todosReducer - case switch - action.type=", action.type, "todos=", todosFromServer);
      return todosFromServer;
    }

    case LOAD_DATA_FROM_SERVER_REJECTED: {
      console.log("todosReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);
      let error = null;
      if( !isNullOrUndef(action.error) && !isNullOrUndef(action.payload.message)){
        switch(action.payload.message){
          case "Network Error":{
            error = {
              message: action.payload.message,
              occured: action.error
            };
            break;
          }

          default:{
            break;
          }
        }
      }
      console.log("todosReducer - case switch - action.type=", action.type, "error=", error);
      return error;
    }

    default:{
      console.log("todosReducer - default switch - action.type=", action.type);
      console.log("todosReducer - default switch - action.type=", action.type, " - return todos=", state);
      return state
    }
  }
}

export default todosReducer;