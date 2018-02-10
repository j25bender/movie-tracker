export const userReducer = (state = {}, action) => {
  const { type, name, email, password, userId } = action;
  switch (type) {
  case 'ADD_USER':
    return {
      name,
      email,
      password,
      userId
    };
  case 'GET_USER':
    return {
      email,
      password,
      userId,
      name
    }
  default:
    return state;
  }
};