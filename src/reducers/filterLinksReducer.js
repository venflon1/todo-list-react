/**
 * I Reducers sono funzioni che:
 * -> ricevono in input 2 cose:  -> lo stato (o parte di esso) dell'app,    -> un'azione
 * -> ritornano il nuovo stato dell'app
 *
 * (Vengono chiamati Reducer, perchè da 2 oggetti che entrano in input: stato e azione, lo riducono in uno solo: il nuovo stato)
 */
import { HANDLE_CLICK_FILTER } from '../actionTypes/todosActionTypes';
import { isNullOrUndef, iSNullOrUndefOrVoidStr } from '../utils/functionUtils';

/**
 *  FilterLinks Reducer
 *  Input : state  - lo stato iniziale
 *  Input : action - l'azione
 *
 *  Output : il nuovo stato
 */
const filterLinksReducer = (state = [], action) =>{
  console.log("filterLinksreducer - START - stateForFilterLinks=", state, " - action=", action);

  switch(action.type){
    case HANDLE_CLICK_FILTER: {
      console.log("filterLinksreducer - case switch - action.type=", action.type);
      const filterLinks = [...state];
      const filterClicked = action.payload.filter;
      if( !isNullOrUndef(filterClicked) && !iSNullOrUndefOrVoidStr(filterClicked.title) ){
        filterLinks.forEach( (filterLink) =>{
          if(filterLink.title !== filterClicked.title && filterLink.active === true){
            filterLink.active = false;
          }
          if(filterLink.title === filterClicked.title  && filterLink.active === false){
            filterLink.active = true;
          }
        });
      }
      console.log("filterLinksreducer - case switch - action.type=", action.type, " return filterLinks=", filterLinks);
      return filterLinks;
    }


    default:{
      console.log("filterLinksreducer - default switch - action.type=", action.type);
      console.log("filterLinksreducer - default switch - action.type=", action.type, " - return newState=", state);
      return state;
    }
  }
}

export default filterLinksReducer;