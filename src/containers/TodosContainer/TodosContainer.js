import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTodo from '../../components/AddTodo/AddTodo';
import TodoList from '../../components/TodoList/TodoList';
import FooterLinks from '../../components/FooterLinks/FooterLinks';
import { addTodoAction, deleteTodoAction, handleClickFilterAction, handleTodoCompleted, loadDataFromServerAction } from '../../actionCreators/todosActionCreators';
import { TODOS_API_URL } from '../../config/API';
import { isArrayNotEmpty, isNullOrUndef, iSNullOrUndefOrVoidStr } from '../../utils/functionUtils';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { withRouter } from 'react-router';

class TodosContent extends Component {

  constructor(props){
    super(props);
    this.todoInput = React.createRef("input");
  }

 componentDidMount = () => {
    console.log("TodosContent.js - componentDidMount - START props=", this.props);

    // this.props.loadData(TODOS_API_URL).then( (response) =>{
    //   console.log("response", response);
    // }).catch( (exception) => {
    //   console.error("loadData From server was an error!");
    // });
    this.props.loadData(TODOS_API_URL);
  }

  render(){
    console.log('TodosContent - render START - props=', this.props);
    console.log('url params matched =', this.props.match.params);
    const idListOfTodos = this.props.match.params.idListOfTodo;

    return (
      <ErrorBoundary>
        <div className="main-content">
          <div className="container">
            <AddTodo
              addTodoHandler={this.props.addTodo}
              onFilterClickHandler={this.props.onFilterClickHandler}/>
            <TodoList
              todos={ this.todosToRenderByIdListOfTodo(this.props.store.todos, idListOfTodos) }
              deleteTodo={this.props.deleteTodo}
              handleTodoCompleted={this.props.handleTodoCompleted}
              error={this.props.store.error} />
          </div>
          <FooterLinks filterLinks={this.props.store.filterLinksTodo}/>
        </div>
      </ErrorBoundary>
    );
  }

  todosToRenderByIdListOfTodo = (todos, idListOfTodo) => {
    console.log("TodosContent - todosToRenderByIdListOfTodo START - todos=", todos, ", idListOfTodo=", idListOfTodo);
    let todosByIdListOfTodo = null;
    if( !iSNullOrUndefOrVoidStr(idListOfTodo)) {
      todosByIdListOfTodo = todos.filter( todo => todo.idList === Number(idListOfTodo) );
    } else{
      todosByIdListOfTodo = todos;
    }
    console.log("TodosContent - todosToRenderByIdListOfTodo END");
    return todosByIdListOfTodo;
  }

}















const todosToRenderByFilter = (state) => {
  console.log("TodosContent - todosToRenderByFilter START - state=", state);
  const filterLinks = state.filterLinksTodo? state.filterLinksTodo: null;
  let todos = [];
  if( !isNullOrUndef(filterLinks) && isArrayNotEmpty(filterLinks) ){
    // prendo il filtro attivo
    const filterActive = filterLinks.filter( (filter) => filter.active === true )[0];
    if( !isNullOrUndef(filterActive) ){
      // analizzo il tipo di filtro
      switch(filterActive.title){
        case 'Completed':{
          console.log('Completed filter is active')
          todos = state.todos.filter( todo => todo.completed === true );
          break;
        }
        case 'Not Completed':{
          todos = state.todos.filter( todo => todo.completed === false );
          break;
        }
        case 'All':
        default: {
          todos = state.todos;
          break;
        }
      }
    }
  }
  console.log("TodosContent - todosToRenderByFilter END");
  return todos;
}

/**
 * La funzione 'mapStateToProps' server per mappare lo stato corrente di redux in props per questo componente.
 *
 * @param curentState - lo stato corrente preso dallo store di redux ( come se passassimo store.getState() )
 * @param ownProps - le props personali di questo componente che arrivano dal componente parent ( facoltativo )
 *
 * @return object -
 */
const mapStateToProps = (currentState, ownProps) => {
  const todos = todosToRenderByFilter(currentState);
  // ritorna un oggetto ...
  const objMapStateToProps = {
      store: {...currentState, todos},
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
    const objDispatchToProps =  {
      addTodo: (todoToAdd) => dispatch( addTodoAction(todoToAdd) ),
      deleteTodo: (idTodoToDelete) => dispatch( deleteTodoAction(idTodoToDelete) ),
      handleTodoCompleted: (idTodoToUpdateCompleted, currentCompletedValue) => dispatch( handleTodoCompleted(idTodoToUpdateCompleted, currentCompletedValue) ),
      onFilterClickHandler: (filterTitle) => dispatch( handleClickFilterAction(filterTitle) ),
      loadData: (apiURl) => dispatch( loadDataFromServerAction(apiURl) )
    };

    return objDispatchToProps;
}

/**
 * La funzione 'connect' collega lo store di redux a questo componente (senza dover fare la subscribe come in redux puro)
 *
 * @param function mapStateToProps - questa funzione riceve 2 argomenti: lo stato dello store e le props personali del component
 * @param function mapDispatchToProps -
 *
 * @return una funzione - connect restituisce una funzione che poi invochiamo passandogli
 *                        il componente a cui vogliamo collegarlo con lo store
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodosContent));