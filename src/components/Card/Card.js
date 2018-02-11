import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

let message;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  displaySignUp = loggedIn => {
    const { toggleFavorite, movieData } = this.props;
    loggedIn && toggleFavorite(movieData);
    message = !loggedIn ? <div id="not-signed-in">Sign up or log in to add favorites</div> : <div />;
    !loggedIn && this.setState({ clicked: true });
  };

  render() {
    const { movieData, loggedIn } = this.props;
    // eslint-disable-next-line
    const { title, overview, poster_path } = movieData;
    const favClass = movieData.favorite ? 'favorite' : '';
    return (
      <div>
        <h1 className="movie-title">{title}</h1>
        <article
          className="card"
          style={{ backgroundImage: `url(${poster_path})` }}
        />
        {!loggedIn && message}
        <button
          onClick={() => this.displaySignUp(loggedIn)}
          className={`favorite-btn ${favClass}`}
        />
      </div>
    );
  }
}

Card.propTypes = {
  movieData: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func,
  loggedIn: PropTypes.bool,
};

export default Card;
