import React, { Component } from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { getMoviesFromApi } from '../../actions/index.js';
import './Main.css';
import PropTypes from 'prop-types';

class Main extends Component {

  componentDidMount = async () => {
    this.props.fetchMovies();
  };

  render() {
    const movieData = this.props.movieData;
    if (movieData.length) {
      const movies = movieData.map(movie => {
        return <Card movieData={movie} key={movie.id} />;
      });
      return <div className="main">{movies}</div>;
    } else {
      return null;
    }
  }
}

export const mapStateToProps = store => ({
  movieData: store.movieData || []
});

export const mapDispatchToProps = dispatch => ({
  fetchMovies: movieData => dispatch(getMoviesFromApi(movieData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  
  fetchMovies: PropTypes.func
};
