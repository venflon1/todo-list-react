/**
 * Gli ActionCreators sono funzioni che:
 * -> ricevono in input dei parametri
 * -> ritornanno in output degli oggetti che sono le action.
 *
 * (Per questo vengono chiamati ActionCreators, ovvero cratori di azioni)
 *
 */
import { SHOW_MODAL, HIDDEN_MODAL } from '../actionTypes/uiActionTypes';

// mostra il modale
export const showModal = () => {
  console.log("getAllTodosFromServerAction - START");
  const LOAD_LISTS_TODOS_FROM_SERVER_CREATOR = {
    type: SHOW_MODAL
  }

  console.log("handleClickFilterAction - return  LOAD_DATA_FORM_SERVER_CREATOR", LOAD_LISTS_TODOS_FROM_SERVER_CREATOR);
  return LOAD_LISTS_TODOS_FROM_SERVER_CREATOR;
}

// nasconde il modale
export const hiddenModal = () => {
  console.log("getAllTodosFromServerAction - START");
  const LOAD_LISTS_TODOS_FROM_SERVER_CREATOR = {
    type: HIDDEN_MODAL
  }

  console.log("handleClickFilterAction - return  LOAD_DATA_FORM_SERVER_CREATOR", LOAD_LISTS_TODOS_FROM_SERVER_CREATOR);
  return LOAD_LISTS_TODOS_FROM_SERVER_CREATOR;
}