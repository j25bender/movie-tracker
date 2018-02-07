export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_USER':
            return { username: action.username,       
                     password: action.password 
            }
        default: 
            return state
    }
}