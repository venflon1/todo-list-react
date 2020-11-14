/**
 * Gli ActionCreators sono funzioni che:
 * -> ricevono in input dei parametri
 * -> ritornanno in output degli oggetti che sono le action.
 *
 * (Per questo vengono chiamati ActionCreators, ovvero cratori di azioni)
 *
 */
import axios from 'axios';
import { ADD_LIST_OF_TODO, DELETE_LIST_OF_TODO, EDIT_LIST_OF_TODO, LOAD_LISTS_TODOS_FROM_SERVER } from '../actionTypes/listsTodosActionTypes';
import { LIST_OF_TODOS_API_URL } from '../config/API';

// CARICAMENTO LISTE DI TODOS (righe tabella "lists todos")
export const loadListsTodosFromServerAction = (urlAPI) => {
  console.log("loadListsTodosFromServerAction - START");
  const LOAD_LISTS_TODOS_FROM_SERVER_CREATOR = {
    type: LOAD_LISTS_TODOS_FROM_SERVER,
    payload: axios.get(urlAPI)
  }

  console.log("loadListsTodosFromServerAction - return  LOAD_DATA_FORM_SERVER_CREATOR", LOAD_LISTS_TODOS_FROM_SERVER_CREATOR);
  return LOAD_LISTS_TODOS_FROM_SERVER_CREATOR;
}

// ADD LISTE DI TODOS (righe tabella "lists todos")
export const addListTodoAction = (listOfTodoObj = {}) => {
  console.log("addListTodoAction - START");
  const todayDate = new Date();
  const todayStrDate = todayDate.getDate() + "/" + (todayDate.getMonth() + 1) +  "/" + todayDate.getFullYear();
  const listToAdd = {
    id: Math.floor(( (Math.random()*1000000 ) + ( Math.random()*10 ) ) - ( (Math.random()*7)*10 ) * 17 ) * 13,
    username: listOfTodoObj.username,
    dateIns: todayStrDate,
    title: listOfTodoObj.title
  };
  const ADD_LIST_OF_TODO_CREATOR = {
    type: ADD_LIST_OF_TODO,
    payload: axios.post(LIST_OF_TODOS_API_URL, listToAdd)
  }

  console.log("addListTodoAction - return  DELETE_LIST_OF_TODO_CREATOR", ADD_LIST_OF_TODO_CREATOR);
  return ADD_LIST_OF_TODO_CREATOR;
}

// EDIT LISTE DI TODOS (righe tabella "lists todos")
export const editListTodoAction = (idListToEdited = '', usernameListToEdited = '', dateListToEdited = '', titleListToEdited = '') => {
  console.log("editListTodoAction - START");
  const dateListToEditedStr = dateListToEdited.getDate() + "/" + dateListToEdited.getMonth() + "/" + dateListToEdited.getFullYear();
  const config = {
    username: usernameListToEdited,
    dateIns: dateListToEditedStr,
    title: titleListToEdited
  };
  const EDIT_LIST_OF_TODO_CREATOR = {
    type: EDIT_LIST_OF_TODO,
    payload: axios.patch(LIST_OF_TODOS_API_URL + "/" + idListToEdited, config )
  }

  console.log("editListTodoAction - return  DELETE_LIST_OF_TODO_CREATOR", EDIT_LIST_OF_TODO_CREATOR);
  return EDIT_LIST_OF_TODO_CREATOR;
}

// DELETE LISTE DI TODOS (righe tabella "lists todos")
export const deleteListTodoAction = (idListToDelete) => {
  console.log("deleteListTodoAction - START");
   const config = {
    idListOfTodoToDeleted: idListToDelete
  };
  const DELETE_LIST_OF_TODO_CREATOR = {
    type: DELETE_LIST_OF_TODO,
    payload: axios.delete(LIST_OF_TODOS_API_URL + "/" + idListToDelete, config )
  }

  console.log("deleteListTodoAction - return  DELETE_LIST_OF_TODO_CREATOR", DELETE_LIST_OF_TODO_CREATOR);
  return DELETE_LIST_OF_TODO_CREATOR;
}