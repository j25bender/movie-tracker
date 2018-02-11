import { combineReducers, createStore } from 'redux';
import rootReducer from './index.js';
import { movieReducer } from './movieReducer';
import { userReducer } from './userReducer';
import { loginReducer } from './loginReducer';

describe('RootReducer Test', () => {
  const rootReducer = combineReducers({ movieReducer, userReducer, loginReducer });
  const mockmovieData = [{
    title: 'Coco',
    id: 354912,
    poster: 'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
    overview:
      "Despite his family’s baffling generations-old ban …ck the real story behind Miguel's family history."
  }];
  let expectedStore;
  let store;

  beforeEach( () => {
    store = createStore(rootReducer);
    expectedStore = { movieReducer: [], 
      userReducer: {}, 
      loginReducer: false 
    }
  });

  it('should have a starting store equal to an empty objects', () => {
    expect(store.getState().movieReducer).toEqual(movieReducer([], {}));
    expect(store.getState().userReducer).toEqual(userReducer({}, {}));
    expect(store.getState().loginReducer).toEqual(loginReducer(false, {}));
  });

  it('movie reducer should handle GET_MOVIES action type and update store', () => {
    expect(store.getState()).toEqual(expectedStore);

    const movieAction = { type: 'GET_MOVIES', movieData: mockmovieData };
    store.dispatch(movieAction);
    expect(store.getState().movieReducer).toEqual(movieReducer([], movieAction));
  })

  it('login reducer should handle LOGIN action type and update store', () => {
    expect(store.getState()).toEqual(expectedStore);

    const loginAction = { type: 'LOGIN', boolean: true };
    store.dispatch(loginAction);
    expect(store.getState().loginReducer).toEqual(loginReducer(true, loginAction));
  })

  it('user reducer should handle both ADD_USER and GET_USER type and update store', () => {
    expect(store.getState()).toEqual(expectedStore);

    const username = 'TBone';
    const email = 'T@Bone.com';
    const password = 'TBoneSteakums';
    const id = 23;

    const addUserAction = { type: 'ADD_USER', username, email, password, id }
    store.dispatch(addUserAction)
    expect(store.getState().userReducer).toEqual(userReducer({}, addUserAction));

    const getUserAction = { type: 'GET_USER', email, password };
    store.dispatch(getUserAction)
    expect(store.getState().userReducer).toEqual(userReducer({}, getUserAction));    
  })
})