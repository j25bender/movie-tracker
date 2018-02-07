const movieReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_MOVIES':
      return [...state, ...action.movieData];
    default: 
      return state;
  }
}

export { movieReducer };