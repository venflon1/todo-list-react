import { createStore, applyMiddleware } from 'redux';
import  RootReducer from '../reducers';
// import { loggerMiddlewear } from '../middlewear/index';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware'
import { isNullOrUndef } from '../utils/functionUtils';

// costante - chiave per accedere ai todos nel localStorage
const TODOS = "todos"

/**
 * JS Plain Object
 * Questo oggetto ha una proprietà todos che è un vettore di oggetti todo
 */
const initialState = {
  todos: [],
  filterLinksTodo: [
    {
      title: 'All',
      active: true
    },
    {
        title: 'Completed',
        active: false
    },
    {
        title: 'Not Completed',
        active: false
    }
  ],
  listsOfTodos: [],
  error: {
    message: '',
    occured: false
  },
  ui:{
    showModal: false
  }
}

// cerco se nel localStorage se ci sono già salvati dei todos (solo la prima volta che accedo all'app non ci saranno)
const stringStoreLocalStorage = localStorage.getItem(TODOS);
const initialStateCopy = { ...initialState };
if( !isNullOrUndef(stringStoreLocalStorage) ){
  const todosLocalStorage = JSON.parse(stringStoreLocalStorage);
  if( !isNullOrUndef(todosLocalStorage) ){
    initialStateCopy.todos = todosLocalStorage;
  }
}

/**
 * Funzione per la costruzione dei middlewear
 * La funzione riceve in input un elenco di funzioni (che sono dei nmiddlewear)
 */
// const middlewears = applyMiddleware(loggerMiddlewear);
 const middlewares = applyMiddleware(logger, promiseMiddleware);


/**
 * Funzione per la creazione dello store di redux.
 * La funzione crateStore prende in input 4 argomenti:
 *    -> reducer,
 *    -> lo stato iniziale dell'app                                                       (facoltativo)
 *    -> un elenco di  middlewear tramite la funzione applyMiddleware /enhancer           (facoltativo)
 */
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore( RootReducer,
                                  initialStateCopy,
                                  middlewares );

/**
 * sottoscrivo index.js ... così che ogni volta cambia lo stato dello store di redux
 * mi viene notificato e viene chiamata la callback
 */
store.subscribe( () => {
  // salvo nel localStorage del browser lo stato iniziale dello store
  const todosStateStore = store.getState().todos;
  const stringStateStore = JSON.stringify(todosStateStore);
  const localStorageStore = null;
  const hasError = store.getState().error.occured === true;
  // aggiorno il localStorage solo se non ci sono errori
  if(!hasError){
    localStorage.setItem(TODOS, stringStateStore);
  }
  console.log('localStorageStore=', localStorageStore);
});

