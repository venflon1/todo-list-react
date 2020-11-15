import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './containers/Login/Login';
import TodosContent from './containers/TodosContainer/TodosContainer';
import ListsOfTodosContent from './containers/ListsOfTodos/ListsOfTodosContainer';
import './App.css';

class App extends Component {

  render(){
    console.log("App - render - props=", this.props);
    return (
      <div className="App">
          <BrowserRouter>
              <Route  exact path="/"      component={Login} />
              <Route  exact path="/login" component={Login} />
              <Route  path="/todos"
                      render={() => <React.Fragment> <Header title="TODO-LIST"/> <TodosContent/> </React.Fragment> } />
              <Route  exact path="/listsoftodos"
                      render={() => <React.Fragment> <Header title="TODO-LIST"/> <ListsOfTodosContent/> </React.Fragment> } />
              <Route  path="/listsoftodos/:idListOfTodo([0-9]+)/todos"
                      render={() => <React.Fragment> <Header title="TODO-LIST"/> <TodosContent/> </React.Fragment> }/>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;