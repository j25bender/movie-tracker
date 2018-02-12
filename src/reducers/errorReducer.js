const errorReducer = (state = false, action) => {
  switch(action.type) {
    case 'HAS_ERRORED':
      return action.boolean
    default:
      return state
  }
}

export { errorReducer };