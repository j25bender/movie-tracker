import React, { Component } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
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
        <Main movieData={this.state.movieData} />
      </div>
    );
  }
}

export default App;
