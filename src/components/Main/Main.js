import React, { Component } from 'react';
import Card from '../Card/Card';
import movieData from '../../helpers/helper.js';
import { connect } from 'react-redux';
import { getMovies } from '../../actions/index.js'
import './Main.css';
// import PropTypes from 'prop-types';

class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   movieData: []
    // };
  }

  componentDidMount = async () => {
    const fetchedMovieData = await movieData.fetchMovies();
    console.log(fetchedMovieData)
    this.props.fetchMovies(fetchedMovieData);
    // this.setState({ movieData: fetchedMovieData });
  };

  render() {
    console.log(this.props)
    const movieData = this.props.movieData;
    if (movieData.length) {
      const movies = movieData.map(movie => {
        return <Card movieData={movie} key={movie.id} />;
      });
      return <div className="main">{movies}</div>;
    } else {
      return null;
    }
  }
};

export const mapStateToProps = store => ({
  movieData: store.movieData || []
});

// export const mapDispatchToProps = dispatch => ({
//   fetchMovies: movieData => dispatch(getMovies(movieData))
// });

export const mapDispatchToProps = dispatch => {
  console.log(dispatch);
  
  return {fetchMovies: movieData => dispatch(getMovies(movieData))}
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

// Main.propTypes = {
//   movieData: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       id: PropTypes.number.isRequired,
//       poster: PropTypes.string.isRequired
//     })
//   )
// };

// export default Main;
