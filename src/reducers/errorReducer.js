/**
 * I Reducers sono funzioni che:
 * -> ricevono in input 2 cose:  -> lo stato (o parte di esso) dell'app,    -> un'azione
 * -> ritornano il nuovo stato dell'app
 *
 * (Vengono chiamati Reducer, perchè da 2 oggetti che entrano in input: stato e azione, lo riducono in uno solo: il nuovo stato)
 */
 import { LOAD_DATA_FROM_SERVER_REJECTED, ADD_TODO_REJECTED,
          DELETE_TODO_REJECTED, HANDLE_COMPLETED_TODO_REJECTED } from '../actionTypes/todosActionTypes';
import { isNullOrUndef } from '../utils/functionUtils';

/**
 *  Error Reducer
 *  Input : state  - lo stato iniziale
 *  Input : action - l'azione
 *
 *  Output : il nuovo stato
 */
const errorReducer = (state = {}, action) =>{
  console.log("filterLinksreducer - START - stateForError=", state, " - action=", action);

  switch(action.type){
    case LOAD_DATA_FROM_SERVER_REJECTED: {
        console.log("errorReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);
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
              error = {
                message: 'Generic Error',
                occured: true
              }
              break;
            }
          }
        }
        console.log("errorReducer - case switch - action.type=", action.type,  "messageError=", action.payload.message, "error=", error);
        return error;
    }

      case ADD_TODO_REJECTED: {
        console.log("errorReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);
        return ;
      }

      case DELETE_TODO_REJECTED: {
        console.log("errorReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);
        return ;

      }

      case HANDLE_COMPLETED_TODO_REJECTED: {
        console.log("errorReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);
        return ;
      }

    default: {
      console.log("todosReducer - default switch - action.type=", action.type);
      console.log("todosReducer - default switch - action.type=", action.type, " - return error=", state);
      return state;
    }
  }
}

export default errorReducer;