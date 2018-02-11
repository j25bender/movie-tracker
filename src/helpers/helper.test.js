/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  cleanMovies,
  fetchMovies,
  findRequestedUser,
  fetchUser,
  postNewUser
} from './helper';
import { movieData, filteredMovieData, allUsers } from './mockData';

describe('helper', () => {
  it('has multiple functions', () => {
    expect(cleanMovies).toBeDefined();
    expect(fetchMovies).toBeDefined();
    expect(fetchUser).toBeDefined();
    expect(postNewUser).toBeDefined();
  });

  describe('cleanMovies', () => {
    it('Filters an array of objects', () => {
      const result = cleanMovies(movieData);
      expect(result).toEqual(filteredMovieData);
    });
  });

  describe('fetchMovies', () => {
    it.skip('Fetchs movie data and returns a filtered array of objects', async () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 200,
        json: () =>
          new Promise((resolve, reject) => {
            resolve(filteredMovieData);
          })
      }));

      const result = await fetchMovies();
      expect(result).toEqual(filteredMovieData);
    });

    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500
        })
      );
      expect(fetchMovies()).rejects.toEqual(
        Error('fetchMovies failed to fetch data')
      );
    });
  });

  describe('findRequestedUser', () => {
    it('finds a match in an array if both the username and password key value pairs are identical to what is passed in', () => {
      expect(findRequestedUser(allUsers, 'steve@smail.com', 'letmein')).toEqual(
        undefined
      );
      expect(findRequestedUser(allUsers, 'bob@aol.com', 'password')).toEqual(
        undefined
      );
      expect(
        findRequestedUser(allUsers, 'tman2272@aol.com', 'letmein')
      ).toEqual(undefined);
      expect(
        findRequestedUser(allUsers, 'tman2272@aol.com', 'password')
      ).toEqual({
        email: 'tman2272@aol.com',
        id: 1,
        name: 'Taylor',
        password: 'password'
      });
    });
  });

  describe('fetchUser', () => {
    it.skip('makes a fetch to get data and then finds the requested user', () => {
      // fetch Api was called
      // findRequesr was called
    });

    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500
        })
      );
      expect(fetchUser()).rejects.toEqual(
        Error('fetchUser failed to fetch data')
      );
    });
  });

  describe('postNewUser', () => {
    it.skip('adds new data to the backEnd database', () => {
      // postBackend was called
    });

    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500
        })
      );
      expect(postNewUser()).rejects.toEqual(
        Error(
          'postNewUser failed to post to backend: Error: postBackend failed to post to backend: Error: Bad status code!'
        )
      );
    });
  });
});
