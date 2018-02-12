import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getMoviesFromApi,
  setFavorites,
  addUser,
  getMovies
} from '../../actions/index.js';
import './Main.css';
import PropTypes from 'prop-types';
import {
  fetchApi,
  postBackend,
  deleteFromBackend
} from '../../helpers/apiCalls';
import Card from '../Card/Card';

export class Main extends Component {
  componentDidMount = async () => {
    this.props.fetchMovies();
  };

  postFavorite = async movieData => {
    const { userId: user_id } = this.props;
    const favoriteProperties = {
      movie_id: movieData.movie_id,
      user_id,
      title: movieData.title,
      poster_path: movieData.poster_path,
      release_date: movieData.release_date,
      vote_average: movieData.vote_average,
      overview: movieData.vote_average
    };
    await postBackend('api/users/favorites/new/', favoriteProperties);
  };

  toggleFavorite = async movieData => {
    const { userId, setFavorites } = this.props;
    const backendFavorites = await fetchApi(`api/users/${userId}/favorites/`);
    const existingFavorites = this.markFavsAsFavorites(backendFavorites.data);
    if (!movieData.favorite) {
      movieData.favorite = !movieData.favorite;
      this.postFavorite(movieData);
      setFavorites([...existingFavorites, movieData]);
    } else {
      const body = { id: userId, movie_id: movieData.movie_id };
      movieData.favorite = !movieData.favorite;
      this.deleteFromStore(existingFavorites, movieData);
      deleteFromBackend(
        `api/users/${userId}/favorites/${movieData.movie_id}`,
        body
      );
    }
  };

  markFavsAsFavorites = favorites => {
    return favorites.map(fav => {
      fav.favorite = true;
      return fav;
    });
  };

  deleteFromStore = (favorites, duplicate) => {
    const { setFavorites } = this.props;
    const duplicateRemoved = favorites.filter(fav => {
      return fav.movie_id !== duplicate.movie_id;
    });
    setFavorites(duplicateRemoved);
  };

  render() {
    let { movieData, loggedIn } = this.props;
    movieData = movieData ? movieData : [];
    if (movieData.length) {
      const movies = movieData.map(movie => {
        return (
          <Card
            movieData={movie}
            key={movie.movie_id}
            loggedIn={loggedIn}
            toggleFavorite={this.toggleFavorite}
          />
        );
      });
      return (
        <div className="main">
          {loggedIn && (
            <Link to={{ pathname: '/favorites' }} >
              <button className="view-favorites">
                Favorites
              </button>
            </Link>
          )}
          {movies}
        </div>
      );
    } else {
      return null;
    }
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userId: state.userData.userId
});

export const mapDispatchToProps = dispatch => ({
  fetchMovies: movieData => dispatch(getMoviesFromApi(movieData)),
  setFavorites: favorites => dispatch(setFavorites(favorites)),
  addUser: user => dispatch(addUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      movie_id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  ),

  fetchMovies: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setFavorites: PropTypes.func.isRequired
};
