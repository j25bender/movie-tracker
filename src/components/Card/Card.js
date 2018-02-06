import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ movieData }) => {
  // eslint-disable-next-line
  const { title, overview, poster } = movieData;
  return (
    <div>
      <h1 className="movie-title">{title}</h1>
      <article className="card" style={{ backgroundImage: `url(${poster})` }} />
      <button className='favorite'></button>
    </div>
  );
};

Card.propTypes = {
  movieData: PropTypes.object.isRequired
};

export default Card;
