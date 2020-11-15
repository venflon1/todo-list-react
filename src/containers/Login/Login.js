import React, {Component} from 'react';
import axios from 'axios';
import './Login.css';
import { isNullOrUndef } from '../../utils/functionUtils';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        userIsLogged: null,
        loginFailureMessage: null
      }
    }

    onUsernameHandler = (event) => {
      const username = event.target.value;
      this.setState({
        username
      });
    }

    onPasswordHandler = (event) => {
      const password = event.target.value;
      this.setState({
        password
      });
    }

    onSubmitHandler = (event) => {
      event.preventDefault();
      const dataToSendServer = {
        username: this.state.username,
        password: this.state.password
      }
      console.log(dataToSendServer);
      // chiamata http per inviare i dati
      axios.post("http://localhost:8080/login", dataToSendServer)
      .then( (response) => {
        if(!isNullOrUndef(response.data) && !isNullOrUndef(response.data.logged)) {
          if(response.data.logged === true){
            this.setState({
              userIsLogged: true,
              loginFailure: null
            });
          } else{
            this.setState({
              userIsLogged: false,
              loginFailureMessage: 'Sorry! Username or Password are not correct'
            });
          }
        }
      })
      .catch( (exception) =>{
        console.log(exception);
        this.setState({
          loginFailureMessage: 'Sorry! Server is not reachble, please contact web administator'
        }, () => console.log('eccezione sollevata ', exception));
      })
    }

    onResetHandler = (event) => {
      console.log("reset login form")
      this.setState({
        username: '',
        password: ''
      });
    }

    render(){
      let loginMessageJsxElement = ( <div className="login-message">
                                      <label>{this.state.loginFailureMessage}</label>
                                   </div> );

      return (
        <div className="login-form">
          {loginMessageJsxElement}
          <form onSubmit={this.onSubmitHandler} >
            <div className="from-group">
              <input
                    onChange={this.onUsernameHandler}
                    value={this.state.username}
                    className="username-inputbox"
                    type="text"
                    required={true}
                    placeholder="username"
              />
              <input
                    onChange={this.onPasswordHandler}
                    value={this.state.password}
                    className="password-inputbox"
                    type="password"
                    required={true}
                    placeholder="password"
              />
            </div>
            <div className="login-buttons">
              <input
                    type="submit"
                    value="Login"
              />
              <button onClick={this.onResetHandler}>Reset</button>
            </div>
            <div className="goto-register">
              <Link to="/signup">Are you not registered? Do it now</Link>
            </div>
          </form>
        </div>
      );
    }
}

export default Login;