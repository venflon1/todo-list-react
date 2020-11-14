import React, { Component } from 'react';
import Header from './components/Header/Header';
import TodosContent from './containers/TodosContainer/TodosContainer';
import ListsOfTodos from './containers/ListsOfTodos/ListsOfTodos';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {

  render(){
    console.log("App - render - props=", this.props);

    return (
      <div className="App">
          <BrowserRouter>
              <Header title="TODO-LIST"/>
              <Route exact path="/" component={TodosContent} />
              <Route path="/todos" component={TodosContent} />
              <Route exact path="/listsoftodos" component={ListsOfTodos} />
          </BrowserRouter>
      </div>
    );
  }
}

export default App;