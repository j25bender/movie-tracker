const loginReducer = (state = false, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.boolean
    default:
      return state;
  }
}


export { loginReducer };
