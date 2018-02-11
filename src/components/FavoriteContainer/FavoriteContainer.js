import React from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const FavoriteContainer = ({ loggedIn, favorites }) => {
  if (favorites.length) {
    const movies = favorites.map(movie => {
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
};

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  favorites: state.favorites
});

export default connect(mapStateToProps, null)(FavoriteContainer);

FavoriteContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  favorites: PropTypes.array.isRequired
};