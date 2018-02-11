import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMoviesFromApi, setFavorites, addUser } from '../../actions/index.js';
import './Main.css';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import {
  fetchApi,
  postBackend,
  deleteFromBackend
} from '../../helpers/apiCalls';

export class Main extends Component {
  componentDidMount = async () => {
    this.props.fetchMovies();
  };

  postFavorite = async movieData => {
    const { userId: user_id } = this.props;

    const {
      id: movie_id,
      title,
      poster_path,
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

    await postBackend('api/users/favorites/new/', favoriteProperties);
  };

  toggleFavorite = async movieData => {
    const { userId, setFavorites } = this.props;
    const existingFavorites = await fetchApi(`api/users/${userId}/favorites/`);
    if (!movieData.favorite) {
      this.postFavorite(movieData);
      setFavorites([...existingFavorites.data, movieData]);
    } else {
      const body = { id: userId, movie_id: movieData.id };
      this.deleteFromStore(existingFavorites, movieData);
      deleteFromBackend(
        `api/users/${userId}/favorites/${movieData.id}`,
        body
      );
    }
    movieData.favorite = !movieData.favorite;
  };

  deleteFromStore = (favorites, duplicate) => {
    const { setFavorites } = this.props;
    const duplicateRemoved = favorites.data.filter( fav => 
      (fav.movie_id !== duplicate.id));
    setFavorites(duplicateRemoved);
  }

  resetStore = () => {
    setFavorites([]);
    addUser('','','','');
  }

  render() {
    let { movieData, loggedIn } = this.props;
    movieData = movieData ? movieData : [];
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
        {
          loggedIn
          && <Link to={{ pathname: '/favorites' }}>
              <button className="view-favorites"
                    onClick={this.resetStore}>Favorites</button>
             </Link>
        }
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
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  ).isRequired,

  fetchMovies: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};
