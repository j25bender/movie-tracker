import React, { Component } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { Switch, Route } from 'react-router-dom';
import movieData from '../../helpers/helper.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieData: []
    };
  }

  componentDidMount = async () => {
    const fetchedMovieData = await movieData.fetchMovies();
    this.setState({ movieData: fetchedMovieData });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' render={ () => (
            <Main movieData={this.state.movieData} />) }>
          </Route>
          <Route path='/login' component={Login} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
