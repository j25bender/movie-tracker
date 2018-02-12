import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { login, setFavorites, addUser, getMovies } from '../../actions/index';
import PropTypes from 'prop-types';

export const Header = props => {
  const { loggedIn, logout, name, movieData } = props;

  const resetStore = () => {
    logout(false);
    setFavorites([]);
    addUser('', '', '', '');
    const resetMovies = movieData.map(movie => {
      movie.favorite = false;
      return movie;
    });
    getMovies(resetMovies);
  };

  const signInButtons = loggedIn ? (
    <div className="login-container">
      <p>{name}</p>
      <button className="logout" onClick={resetStore}>
        Log Out
      </button>
    </div>
  ) : (
    <div className="login-container">
      <NavLink to={{ pathname: '/sign-up' }}>
        <button className="sign-up">Sign Up</button>
      </NavLink>
      <NavLink to={{ pathname: '/login' }}>
        <button className="login">Login</button>
      </NavLink>
    </div>
  );

  return (
    <nav>
      {signInButtons}
      <NavLink to={{ pathname: '/' }}>
        <h1 className="title">Movie Tracker</h1>
      </NavLink>
    </nav>
  );
};

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  name: state.userData.name,
  movieData: state.movieData
});

export const mapDispatchToProps = dispatch => ({
  logout: boolean => dispatch(login(boolean))
});

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      movie_id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
