import React, { Component } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route path='/login' component={ Login } />
          <Route path='/sign-up' component={ SignUp } />
        </Switch>
      </div>
    );
  }
}

export default App;
