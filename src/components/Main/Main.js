import React from 'react';
import Card from '../Card/Card';
import './Main.css'

const Main = ({ movieData }) => {
  if (movieData.length) {
    const movies = movieData.map( movie => {
      return (
        <Card movieData={movie}
              key={movie.id} />
      )
    })
    return (
      <div className='main'>
        {movies}
      </div>
    )
  } else {
    return null;
  }
}

export default Main;