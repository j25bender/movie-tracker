import React, { Component } from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { getMoviesFromApi } from '../../actions/index.js';
import './Main.css';
import PropTypes from 'prop-types';
import { fetchApi, postBackend } from '../../helpers/apiCalls';

class Main extends Component {
  componentDidMount = async () => {
    this.props.fetchMovies();
  };

  postFavorite = async movieData => {
    const { userId: user_id } = this.props;
    
    const {
      id: movie_id,
      title,
      poster: poster_path,
      release_date,
      vote_average,
      overview
    } = movieData;

    const favoriteProperties = {
      movie_id,
      user_id,
      title,
      poster_path,
      release_date,
      vote_average,
      overview
    };

    const addFavorite = await postBackend('api/users/favorites/new/', favoriteProperties);
  };

  toggleFavorite = async movieData => {
    const { userId } = this.props;
    const existingFavorites = await fetchApi(`api/users/${userId}/favorites/`);
    const duplicate = existingFavorites.data.find( fav => fav.movie_id === movieData.id );
    !duplicate && this.postFavorite(movieData);
  };

  render() {
    const { movieData, loggedIn } = this.props;
    if (movieData.length) {
      const movies = movieData.map(movie => {
        return (
          <Card
            movieData={movie}
            key={movie.id}
            loggedIn={loggedIn}
            toggleFavorite={this.toggleFavorite}
          />
        );
      });
      return (
        <div className="main">
          <button className="view-favorites">Favorites</button>
          {movies}
        </div>
      );
    } else {
      return null;
    }
  }
}

export const mapStateToProps = state => ({
  movieData: state.movieData || [],
  loggedIn: state.loggedIn,
  userId: state.userData.userId
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
