import React, { Component } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class App extends Component {

  render() {
    console.log(this.props.loggedIn)
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route path='/login' render={ () => (
            this.props.loggedIn 
            ? ( <Redirect to='/' /> )
            : (<Login />)
          ) } />
          <Route path='/sign-up' component={ SignUp } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
})

export default withRouter(connect(mapStateToProps)(App));
// export default App;