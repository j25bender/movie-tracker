import React, { Component } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>

          <Route exact path="/" render={ () => (
            <Main movieData={this.props.movieData} />
          )} />
          <Route path="/favorites" render={ () => (
            this.props.loggedIn
            ? (<Main movieData={this.props.favorites} />)
            : (<Main movieData={this.props.movieData} />)
          ) } />
          <Route
            path="/login"
            render={() =>
              this.props.loggedIn ? <Redirect to="/" /> : <Login />
            }
          />
          <Route
            path="/sign-up"
            render={() =>
              this.props.loggedIn ? <Redirect to="/" /> : <SignUp />
            }
          />
          
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  movieData: state.movieData,
  favorites: state.favorites
});

App.propTypes = {
  loggedIn: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, null)(App));
