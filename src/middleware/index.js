/**
 * Un middlewear è una funzione che viene chiamata prima e/o dopo una dispatch
 * (Da middlewear -> uomo in mezzo , è una funzione che viene invocata in mezzo alla dispatch)
 *
 * @param  object (che chiamo store) - Questo oggetto contiene 2 funzioni: -> dipatch e -> getState dello store di redux
 */
export const loggerMiddlewear = (store) => {
  const dispatch = store.dispatch;
  const getState = store.getState;
  console.log('loggerMiddlewear - START - props=', store);
  return (nextDispatch) => {
    console.log('loggerMiddleWear - nextDispatch=', nextDispatch);
    return (action) => {
      console.log('loggerMiddleWear - action=', action);
      nextDispatch(action);
    };
  };
}