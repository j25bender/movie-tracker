const loginReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_USER':
      return { email: action.email, password: action.password}
    default:
      return state;
  }
}

export {loginReducer};