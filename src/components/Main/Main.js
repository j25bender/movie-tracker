import React from 'react';
import Card from '../Card/Card';
import './Main.css';
import PropTypes from 'prop-types';

const Main = ({ movieData }) => {
  if (movieData.length) {
    const movies = movieData.map(movie => {
      return <Card movieData={movie} key={movie.id} />;
    });
    return <div className="main">{movies}</div>;
  } else {
    return null;
  }
};

Main.propTypes = {
  movieData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired
    })
  )
};

export default Main;
