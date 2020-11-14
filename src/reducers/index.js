/**
 * I Reducers sono funzioni che:
 * -> ricevono in input 2 cose:  -> lo stato (o parte di esso) dell'app,    -> un'azione
 * -> ritornano il nuovo stato dell'app
 *
 * (Vengono chiamati Reducer, perchè da 2 oggetti che entrano in input: stato e azione, lo riducono in uno solo: il nuovo stato)
 */
import { combineReducers } from 'redux';
import TodosReducer from './todosReducer';
import FilterLinksReducer from './filterLinksReducer';
import ErrorReducer from './errorReducer';
import ListsTodosReducer from './listsTodosReducer';
import UiReducer from './uiReducer';

/**
 *  Root reducer
 *
 */
const rootReducer = combineReducers({
  todos: TodosReducer,
  filterLinksTodo: FilterLinksReducer,
  error: ErrorReducer,
  listsOfTodos: ListsTodosReducer,
  ui: UiReducer
});

export default rootReducer