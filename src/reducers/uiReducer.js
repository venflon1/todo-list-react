/**
 * I Reducers sono funzioni che:
 * -> ricevono in input 2 cose:  -> lo stato (o parte di esso) dell'app,    -> un'azione
 * -> ritornano il nuovo stato dell'app
 *
 * (Vengono chiamati Reducer, perchè da 2 oggetti che entrano in input: stato e azione, lo riducono in uno solo: il nuovo stato)
 */
import { SHOW_MODAL, HIDDEN_MODAL } from '../actionTypes/uiActionTypes';

/**
 *  Error Reducer
 *  Input : state  - lo stato iniziale
 *  Input : action - l'azione
 *
 *  Output : il nuovo stato
 */
const uiReducer = (state = {}, action) =>{
  console.log("uiReducer - START - state=", state, " - action=", action);

  switch(action.type){
    case SHOW_MODAL: {
      let uiCopy = {...state.ui};
      uiCopy.showModal = true;
      console.log("uiReducer - case switch - action.type=", action.type, "return ", uiCopy);
      return uiCopy;
    }

    case HIDDEN_MODAL: {
      let uiCopy = {...state.ui};
      uiCopy.showModal = false;
      console.log("uiReducer - case switch - action.type=", action.type, "return ", uiCopy);
      return uiCopy;
    }

    default: {
      console.log("uiReducer - default switch - action.type=", action.type);
      console.log("uiReducer - default switch - action.type=", action.type, " - return error=", state);
      return state;
    }
  }
}

export default uiReducer;