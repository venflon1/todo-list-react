/**
 * I Reducers sono funzioni che:
 * -> ricevono in input 2 cose:  -> lo stato (o parte di esso) dell'app,    -> un'azione
 * -> ritornano il nuovo stato dell'app
 *
 * (Vengono chiamati Reducer, perchè da 2 oggetti che entrano in input: stato e azione, lo riducono in uno solo: il nuovo stato)
 */
import { ADD_LIST_OF_TODO_FULFILLED, ADD_LIST_OF_TODO_REJECTED, DELETE_LIST_OF_TODO_FULFILLED, DELETE_LIST_OF_TODO_REJECTED, EDIT_LIST_OF_TODO_FULFILLED, EDIT_LIST_OF_TODO_REJECTED, LOAD_LISTS_TODOS_FROM_SERVER_FULFILLED, LOAD_LISTS_TODOS_FROM_SERVER_REJECTED} from '../actionTypes/listsTodosActionTypes';
import { isNullOrUndef } from '../utils/functionUtils';

/**
 *  Error Reducer
 *  Input : state  - lo stato iniziale
 *  Input : action - l'azione
 *
 *  Output : il nuovo stato
 */
const listsTodosReducer = (state = {}, action) =>{
  console.log("listsTodosReducer - START - stateForError=", state, " - action=", action);

  switch(action.type){
    case LOAD_LISTS_TODOS_FROM_SERVER_FULFILLED: {
      console.log("listsTodosReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);
      let listsTodosFromServer = null;
      if(!isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && action.payload.status === 200 && !isNullOrUndef(action.payload.data)){
        listsTodosFromServer = action.payload.data;
        console.log("listsTodosReducer - case switch - action.type=", action.type, "dataFromServer=", listsTodosFromServer);
      }
      console.log("listsTodosReducer - case switch - action.type=", action.type, "todos=", listsTodosFromServer);
      return listsTodosFromServer;
    }

    case LOAD_LISTS_TODOS_FROM_SERVER_REJECTED: {
        console.log("listsTodosReducer - case switch - action.type=", action.type, "messageError=", action.payload.message);
        return ;
    }

    case ADD_LIST_OF_TODO_FULFILLED: {
      console.log("listsTodosReducer - case switch - action.type=", action.type);
      let newListsOfTodos = [...state];
      let listOftodoToAdd = null;
      if( !isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && (action.payload.status === 200 || action.payload.status === 201) && !isNullOrUndef(action.payload.data)){
        listOftodoToAdd = action.payload.data;
        if( !isNullOrUndef(listOftodoToAdd) ){
          newListsOfTodos.push(listOftodoToAdd);
        }
      }
      return newListsOfTodos;
    }

    case ADD_LIST_OF_TODO_REJECTED: {
        console.log("listsTodosReducer - case switch - action.type=", action.type);
        return ;
    }

    case EDIT_LIST_OF_TODO_FULFILLED: {
      console.log("listsTodosReducer - case switch - action.type=", action.type);
      let listsTodosFromServer = null;
      // if(!isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && action.payload.status === 200 && !isNullOrUndef(action.payload.data)){
      //   listsTodosFromServer = action.payload.data;
      // }
      // console.log("listsTodosReducer - case switch - action.type=", action.type, "todos=", listsTodosFromServer);
      return listsTodosFromServer;
    }

    case EDIT_LIST_OF_TODO_REJECTED: {
        console.log("listsTodosReducer - case switch - action.type=", action.type);
        return ;
    }

    case DELETE_LIST_OF_TODO_FULFILLED: {
      console.log("listsTodosReducer - case switch - action.type=", action.type);
      const oldListOfTodos = [...state];
      let newlistOfTodos = null;
      if( !isNullOrUndef(action.payload) && !isNullOrUndef(action.payload.status) && action.payload.status === 200 && !isNullOrUndef(action.payload.config.idListOfTodoToDeleted)){
        const idListOfTodoToDelete = action.payload.config.idListOfTodoToDeleted;
        console.log("listsTodosReducer - case switch - action.type=", action.type," - idTodoToDelete=", idListOfTodoToDelete );
        newlistOfTodos = oldListOfTodos.filter( (listOfTodo) => listOfTodo.id !== idListOfTodoToDelete );
      }
      console.log("listsTodosReducer - case switch - action.type=", action.type, " - return listsOfTodo=", newlistOfTodos);
      return newlistOfTodos;
    }

    case DELETE_LIST_OF_TODO_REJECTED: {
        console.log("listsTodosReducer - case switch - action.type=", action.type);
        return ;
    }

    default: {
      console.log("listsTodosReducer - default switch - action.type=", action.type, " - return error=", state);
      return state;
    }
  }
}

export default listsTodosReducer;