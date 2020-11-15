import React, { Component } from 'react'
import { connect } from 'react-redux';
import TodoListItemRow from '../../components/TodoListItemRow/TodoListItemRow';
import TableActionBar from '../../components/TableActionBar/TableActionBar';
import Modal from '../../components/ui/Modal/Modal';
import { isArrayNotEmpty, isNullOrUndef, iSNullOrUndefOrVoidStr } from '../../utils/functionUtils';
import { LIST_OF_TODOS_API_URL } from '../../config/API';
import { loadListsTodosFromServerAction, addListTodoAction, deleteListTodoAction, editListTodoAction } from '../../actionCreators/listsTodosActionCreators';
import './ListsOfTodos.css';

class ListsOfTodosContainer extends Component {

  constructor(props){
    super(props);
    this.state={
      titleTodoListToAdd: '',
      isModalFormValid: false
    }
  }

  componentDidMount(){
    console.log("ListsOfTodos.js - componentDidMount - START props=", this.props);
    // this.props.loadData(LIST_OF_TODOS_API_URL).then( (response) =>{
    //   console.log("response", response);
    // }).catch( (exception) => {
    //   console.error("loadData From server was an error!");
    // });
    this.props.loadData(LIST_OF_TODOS_API_URL);
  }

  onModalFormHandler = (event) => {
    const data = {
      titleListToAdd: event.target.value
    };
    const isFormValid = this.validateForm(data);
    if(isFormValid){
      this.setState({
        titleTodoListToAdd: data.titleListToAdd,
        isModalFormValid: true
      });
    } else {
        this.setState({
        isModalFormValid: false
      });
    }
  }

  validateForm = (formData) => {
    if(isNullOrUndef(formData)){
      return false;
    } else if(iSNullOrUndefOrVoidStr(formData.titleListToAdd)){
      return false;
    } else {
      return true;
    }
  }

  onSaveFormModalHandler = (event) => {
    console.log('i click on save');
    const listOfTodoToSave = {
      username: 'aaa',
      title: this.state.titleTodoListToAdd
    };
    this.props.addTodoList(listOfTodoToSave)
  }

  onEditItemHandler = (id) => {
    console.log("i click on edit");
    const currentLocation = window.location.href;
    window.location.href = currentLocation + "/" + id + "/todos";
  }

  onDeleteItemHandler = (idListOfTodoToDelete) => {
    console.log("i click on delete");
    this.props.deleteTodoList(idListOfTodoToDelete);
  }

    /**
   * Questo metodo si occupa di costruire le righe della tabella a partire dai dati che gli passano
   * Si aspetta gli venga passato un array di oggetti.
   * Ogni oggetto contiene i dati di una riga - quindi un oggetto del vettore mappa una riga della tabella
   * @param   todosListItemRows - array di oggetti.
   * @return  JSX code - righe della tabella da renderizzare
   */
  getbodyTableRow = (todoListItemsRows = []) => {
    if( isNullOrUndef(todoListItemsRows) || !isArrayNotEmpty(todoListItemsRows) ){
      return null;
    } else {
      const rowsContentJsxElement = todoListItemsRows.map( (todoListItemData) => {
        return ( <TodoListItemRow
                                  key={todoListItemData.id}
                                  dataRow={todoListItemData}
                                  onEditItemRow={this.onEditItemHandler}
                                  onDeleteItemRow={this.onDeleteItemHandler}/> );
      });
      return rowsContentJsxElement;
    }
  }

  render() {
    console.log('ListOfTodosContainer - render - START - props=', this.props);
    const rowsJsxElement = this.getbodyTableRow(this.props.store.listsOfTodos);
    const noContenData = rowsJsxElement === null? <span>No Content</span>: null;
    let modal = null;
    if( !isNullOrUndef(this.props.store.ui.showModal) && this.props.store.ui.showModal === true){
      modal = ( <Modal
                      proceedToSendForm={this.state.isModalFormValid}
                      onProceedToSendForm={this.onSaveFormModalHandler}>
        <div className="add-todoList">
          <form onChange={this.onModalFormHandler}>
            <label>Insert title of todo list</label>
            <textarea
              cols={70}
              rows={8} />
          </form>
        </div>
      </Modal>);
    }

    return (
      <React.Fragment>
        {modal}
        <div className="lists-of-todos">
          <div className="title">
            <h1>Lists of todos</h1>
          </div>
          <div className="content-page">
            <TableActionBar
              className="top-actionBar" />
            <table>
              <thead>
                <tr>
                  <td>Username</td>
                  <td>Date Insert</td>
                  <td>Todo List Name</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {rowsJsxElement}
              </tbody>
            </table>
          </div>
        </div>
        <div className="alert-message">
          {noContenData}
        </div>
      </React.Fragment>
    )
  }

}















/**
 * La funzione 'mapStateToProps' server per mappare lo stato corrente di redux in props per questo componente.
 *
 * @param curentState - lo stato corrente preso dallo store di redux ( come se passassimo store.getState() )
 * @param ownProps - le props personali di questo componente che arrivano dal componente parent ( facoltativo )
 *
 * @return object -
 */
const mapStateToProps = (currentState, ownProps) =>{
  // ritorna un oggetto ...
  const objMapStateToProps = {
      store: {...currentState},
      ownProps: {...ownProps}
  };

  return objMapStateToProps;
}

/**
 * La funzione 'mapDispatchToProps' serve per far passare le funzioni definite nello store in props per questo componente.
 *
 * @param dispatch - funzione dispatch dello store
 * @param ownProps - le proprietà personali del componente (facoltativo)
 *
 * @return object - oggetto con tutte le funzioni che voglio passare a questo componente
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      loadData:       (apiURl)            => dispatch( loadListsTodosFromServerAction(apiURl) ),
      addTodoList:    (todoListToAdd)     => dispatch( addListTodoAction(todoListToAdd) ),
      deleteTodoList: (todListIdToDel)    => dispatch( deleteListTodoAction(todListIdToDel) ) ,
      editTodoList:   (todoListIdToEdit)  => dispatch( editListTodoAction(todoListIdToEdit) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsOfTodosContainer);
