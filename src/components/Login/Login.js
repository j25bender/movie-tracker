import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../helpers/helper';
import { fetchApi } from '../../helpers/apiCalls';
import { getUser, login, setFavorites, getMovies } from '../../actions/index';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: '',
      error: false
    };
  }

  async validateLogin() {
    const { handleLogin, handleSubmit } = this.props;
    const { email, password } = this.state;
    const userMatch = await fetchUser(email, password);
    try {
      if (userMatch) {
        handleLogin(true);
        handleSubmit(
          this.state.email.toLowerCase(),
          this.state.password,
          userMatch.id,
          userMatch.name
        );
        this.loadFavorites(userMatch)
      } else {
        this.setState({
          message: 'Invalid email and password!'
        })
      }
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  loadFavorites = async (user) => {
    const { setFavorites, getMovies } = this.props;
    const existingFavorites = await fetchApi(`api/users/${user.id}/favorites/`);
    const favorites = this.markFavsAsFavorites(existingFavorites.data);
    const movies = this.markMoviesAsFavorites(existingFavorites.data);
    setFavorites(favorites);
    getMovies(movies);
  }

  markMoviesAsFavorites = (favorites) => {
    const { movieData } = this.props;
    return movieData.map( movie => {
      movie.favorite = favorites.find( fav => movie.movie_id === fav.movie_id) 
        ? true 
        : false;
      return movie
    })
  }

  markFavsAsFavorites = (favorites) => {
    return favorites.map( fav => {
      fav.favorite = true;
      return fav
    })
  }

  render() {
    return (
      <section>
        {
          this.state.message && <div className="failed-login">{this.state.message}</div>
        }
        {
          this.state.error && <div className="failed-login">{this.state.error}</div>
        }
        <form
          onSubmit={event => {
            event.preventDefault();
            this.validateLogin();
          }}
        >
          <input
            value={this.state.email}
            placeholder="email"
            type="email"
            autoComplete="email"
            onChange={event => this.setState({ email: event.target.value })}
            required
          />
          <input
            value={this.state.password}
            placeholder="password"
            type="password"
            autoComplete="on"
            onChange={event => this.setState({ password: event.target.value })}
            required
          />
          <button>Log In</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  movieData: state.movieData
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: (email, password, userId, name) =>
    dispatch(getUser(email, password, userId, name)),
  handleLogin: boolean => dispatch(login(boolean)),
  setFavorites: favorites => dispatch(setFavorites(favorites)),
  getMovies: movies => dispatch(getMovies(movies))
});

Login.propTypes = {
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
