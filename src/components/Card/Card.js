import React from 'react';
import './Card.css';

const Card = ({ movieData }) => {
  const { title, overview, id, poster } = movieData
  return (
    <div>
      <h1 className='movie-title'>{title}</h1>
      <article className='card'
               style={{backgroundImage: `url(${poster})`}}>
      </article>
    </div>
  )
}

export default Card;