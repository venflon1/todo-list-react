
/**
 * Gli ActionCreators sono funzioni che:
 * -> ricevono in input dei parametri
 * -> ritornanno in output degli oggetti che sono le action.
 *
 * (Per questo vengono chiamati ActionCreators, ovvero cratori di azioni)
 *
 */
import axios from 'axios';
import { ADD_TODO, DELETE_TODO,HANDLE_CLICK_FILTER, HANDLE_COMPLETED_TODO, LOAD_DATA_FROM_SERVER } from '../actionTypes/todosActionTypes';
import { TODOS_API_URL } from '../config/API';

/* INSERIMENTO NUOVO TODO */
export const addTodoAction = (todoTitle = '') => {
  console.log("addTodoAction - START - todoTitle=", todoTitle);
  const todoToAdd = {
    id: Math.floor(( (Math.random()*1000000 ) + ( Math.random()*10 ) ) - ( (Math.random()*13)*10 ) * 17 ) * 3,
    title: todoTitle,
    completed: false
  };

  const ADD_TODO_ACTION_CREATOR = {
    type: ADD_TODO,
    payload: axios.post(TODOS_API_URL, todoToAdd)
  }

  console.log("addTodoAction - return  ADD_TODO_ACTION_CREATOR", ADD_TODO_ACTION_CREATOR);
  return ADD_TODO_ACTION_CREATOR;
}

/* GESTIONE COMPLETAMENTO TODO  (SPUNTA CHECKED TODO) */
export const handleTodoCompleted = (idTodo, completedValue) => {
  console.log("handleTodoCompleted - START - idTodoToChangeCompleted=", idTodo, " comletedValue=", completedValue);
  const dataToUpdate = { completed: completedValue };
  const config = { "Content-Type": "application/json", idTodoUpdated: idTodo };
  const HANDLE_TODO_COMPLETED_ACTION_CREATOR = {
    type: HANDLE_COMPLETED_TODO,
    payload: axios.patch(TODOS_API_URL + '/' + idTodo, dataToUpdate, config)
  }

  console.log("handleTodoCompleted - return  HANDLE_TODO_COMPLETED_ACTION_CREATOR", HANDLE_TODO_COMPLETED_ACTION_CREATOR);
  return HANDLE_TODO_COMPLETED_ACTION_CREATOR;
}

/* CANCELLAZIONE TODO ESISTENTE */
export const deleteTodoAction = (idTodoToDelete) => {
  console.log("deleteTodoAction - START - idTodoToDelete=", idTodoToDelete);
  const config = {
    idTodoDeleted: idTodoToDelete
  };
  const DELETE_TODO_ACTION_CREATOR = {
    type: DELETE_TODO,
    payload: axios.delete(TODOS_API_URL + '/' + idTodoToDelete, config)
  }

  console.log("deleteTodoAction - return  DELETE_TODO_ACTION_CREATOR", DELETE_TODO_ACTION_CREATOR);
  return DELETE_TODO_ACTION_CREATOR;
}
/*************************************************************************************************************/

/* GESTIONE FILTRI PER I TODOS */
export const handleClickFilterAction = (filterTitle = 'All') => {
  console.log("handleClickFilterAction - START - filterTitle=", filterTitle);
  const HANDLE_CLICK_FILTER_CREATOR = {
    type: HANDLE_CLICK_FILTER,
    payload: {
      filter: { title: filterTitle}
    }
  }

  console.log("handleClickFilterAction - return  HANDLE_CLICK_FILTER_CREATOR", HANDLE_CLICK_FILTER_CREATOR);
  return HANDLE_CLICK_FILTER_CREATOR;
}
/*************************************************************************************************************/

/* CARICAMENTO DATI DAL SERVER PER I TODOS di una todoList */
export const loadDataFromServerAction = (urlAPI) => {
  console.log("getAllTodosFromServerAction - START");
  const LOAD_DATA_FORM_SERVER_CREATOR = {
    type: LOAD_DATA_FROM_SERVER,
    payload: axios.get(urlAPI)
  }

  console.log("handleClickFilterAction - return  LOAD_DATA_FORM_SERVER_CREATOR", LOAD_DATA_FORM_SERVER_CREATOR);
  return LOAD_DATA_FORM_SERVER_CREATOR;
}

