/* eslint-disable */
import * as actions from '../index';
import { createStore } from 'redux';
import rootReducer from '../../reducers/index';

let store = createStore(rootReducer)

describe('all actions', () => {
    const mockmovieData = {
      title: 'Coco',
      id: 354912,
      poster: 'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
      overview:
        "Despite his family’s baffling generations-old ban …ck the real story behind Miguel's family history."
    };
  it('should return a type of GET_MOVIES, with a movieData', () => {
    const expected = {
      type: 'GET_MOVIES',
      movieData: mockmovieData
    };
    expect(actions.getMovies(mockmovieData)).toEqual(expected);
  });

  it('should return a type of ADD_USER, with username, email and password', () => {
    const name = 'Bob'
    const email = 'Bob@Bob.com'
    const password = 'Bob123'
    const userId = 23

    const expected = {
      type: 'ADD_USER',
      name,
      email,
      password,
      userId
    }
    expect(actions.addUser(name, email, password, userId)).toEqual(expected)
  })

  it('should return a type of GET_USER with an email and password', () => {
    const email = 'Bob@Bob.com';
    const password = 'Bob123';
    const expected = {
      type: 'GET_USER',
      email,
      password
    }
    expect(actions.getUser(email, password)).toEqual(expected);
  });

  it('should return a type of LOGIN and a payload of boolean', () => {
    const boolean = false
    const expected = {
      type: 'LOGIN',
      boolean
    }
    expect(actions.login(false)).toEqual(expected);
  });

  it('getMoviesFromApi returns a function', () => {
    expect(typeof actions.getMoviesFromApi()).toEqual('function');
  })

  it('hasErrored has type HAS_ERRORED and payload of boolean', () => {
    const boolean = true;
    const expected = {
      type: 'HAS_ERRORED',
      boolean
    }

    expect(actions.hasErrored(true)).toEqual(expected);
  })
});
