const movieReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_MOVIES':
      return action.movieData;
    default: 
      return state;
  }
}

export { movieReducer };