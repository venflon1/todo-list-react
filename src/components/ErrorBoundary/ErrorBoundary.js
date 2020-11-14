import React, { Component } from 'react';

export default class ErrorBoundary extends Component {

  static error = null;
  constructor(props){
    super(props);
    this.state = {
      errorOccured: false,
      errorMessage: ''
    }
  }

  static getDerivedStateFromError(error) {
    console.log("ErrorBoundary - getDerivedStateFromError - START - error=", error);
    const newState = {
      errorOccured: true,
      errorMessage: error.errorMessage
    }
    return newState;
 }

  componentDidCatch = (error, info) => {
    console.log("ErrorBoundary - componentDidCatch - START - error=", error, " info=", info);
  }

  render(){
    let elementToRender = null;
    if(this.state.errorOccured){
      elementToRender = (<span>
                        <h1>{this.state.errorMessage || "There was an error!"}</h1>
                      </span>);
    } else {
      elementToRender = this.props.children;
    }

    return elementToRender;
  }
}