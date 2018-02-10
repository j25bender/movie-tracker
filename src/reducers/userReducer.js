export const userReducer = (state = {}, action) => {
  const { type, name, email, password, id } = action;
  console.log(name)
  switch (type) {
  case 'ADD_USER':
    return {
      name,
      email,
      password,
      id
    };
  case 'GET_USER':
    return {
      email,
      password,
      id,
      name
    }
  default:
    return state;
  }
};